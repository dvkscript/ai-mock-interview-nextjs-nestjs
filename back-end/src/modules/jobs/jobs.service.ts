import { join } from 'path';
import { JobQuestionAnswerRepository } from './repositories/job_question_answer.repository';
import { BadRequestException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JOB_FEEDBACK_REPOSITORY, JOB_QUESTION_ANSWER_REPOSITORY, JOB_QUESTION_REPOSITORY, JOB_REPOSITORY } from './job.di-tokens';
import { JobRepository } from './repositories/job.respository';
import { CreateJobRequestDto } from './dto/create-job.request.dto';
import { GatewayHttpService } from '../shared/http/gateway-http.service';
import { FeedBackDataPrompt, generateFeedbackPrompt, generateQuestionDefaultPrompt, generateQuestionPrompt, QuestionDataPrompt } from './job.prompt';
import { extractJSONBlock, safeParseJSON } from 'src/libs/utils/json';
import { StatusCode } from 'src/libs/exceptions/codes.exception';
import { FindJobQuestionResponse } from './dto/query/find-job_quesion.reponse';
import { CreateAnswerInputDto } from './dto/input/create-answer.input.dto';
import { JobQuestionRepository } from './repositories/job_question.repository';
import { DatabaseService } from '../database/database.service';
import { CreateAnswerQuestionResponseDto } from './dto/create-answer_question.reponse';
import { JobStatus } from '../shared/enum/job-status';
import { UpdateJobInputDto } from './dto/input/update-job.input.dto';
import { groupBy, mapValues } from 'src/libs/utils/lodash';
import { JobFeedbackRepository } from './repositories/job_feedback.repository';
import { PaginationDto } from './dto/query/pagination.dto';
import { GenerateTextContentDto } from '../shared/http/dto/generateTextContent.dto';

@Injectable()
export class JobsService {
    constructor(
        @Inject(JOB_REPOSITORY)
        private readonly jobRepository: JobRepository,
        @Inject(JOB_QUESTION_REPOSITORY)
        private readonly jobQuestionRepository: JobQuestionRepository,
        @Inject(JOB_QUESTION_ANSWER_REPOSITORY)
        private readonly jobQuestionAnswerRepository: JobQuestionAnswerRepository,
        @Inject(JOB_FEEDBACK_REPOSITORY)
        private readonly jobFeedbackRepository: JobFeedbackRepository,
        private readonly gatewayHttpService: GatewayHttpService,
        private readonly databaseService: DatabaseService,
    ) { }

    async createJob(userId: string, job: CreateJobRequestDto) {
        const prompt = generateQuestionPrompt(job);
        const questionRes = await this.gatewayHttpService.generateText(prompt, job.model, generateQuestionDefaultPrompt);
        if (!questionRes) {
            throw new Error("Generate question failed");
        }

        const questionStr = extractJSONBlock(
            questionRes.text
        );
        if (!questionStr) {
            throw new HttpException("JSON block not found in the response text", StatusCode.INTERNAL_SERVER_ERROR, {
                description: "JSON block not found in the response text"
            })
        }
        const questionParse = safeParseJSON<QuestionDataPrompt | null>(questionStr);
        if (!questionParse) {
            throw new HttpException("JSON parse error", StatusCode.INTERNAL_SERVER_ERROR, {
                description: "JSON parse error"
            })
        }
        const audioIdUploaded: string[] = [];

        try {
            const audios = await Promise.all(
                questionParse.map(item => this.gatewayHttpService.convertTextToSpeech(item.question))
            );
            const questions = await Promise.all(
                questionParse.map(async (item, index) => {
                    const uploaded = await this.gatewayHttpService.uploadFile(userId, audios[index]);
                    audioIdUploaded.push(uploaded.id);
                    return {
                        ...item,
                        audioUrl: uploaded.url,
                        audioId: uploaded.id
                    };
                })
            );
            const jobRes = await this.jobRepository.createJob({
                ...job,
                questions,
                userId
            })

            if (!jobRes) {
                throw new Error("Invalid Server Error");
            }
            return jobRes;
        } catch (error) {
            console.error("Error creating job:", error);
            if (audioIdUploaded.length > 0) {
                await this.gatewayHttpService.deleteFile(audioIdUploaded);
            }
            throw new HttpException(error.message || "Invalid Server error", StatusCode.INTERNAL_SERVER_ERROR, {
                description: "Create job failed"
            })
        }
    }

    async getJobWithQuestion(id: string): Promise<FindJobQuestionResponse> {
        const job = await this.jobRepository.getJobQuestions(id);

        if (!job) {
            throw new NotFoundException("Job not found", {
                description: "Job not found"
            })
        }

        return new FindJobQuestionResponse(job);
    }

    async createAnswerQuestion(body: CreateAnswerInputDto) {
        const { questionId, answer } = body;
        const question = await this.jobQuestionRepository.findByPk(questionId);
        if (!question) {
            throw new NotFoundException("Question not found", {
                description: "Question not found"
            })
        }
        return await this.databaseService.transaction(async (t) => {
            const [answerCreate, test] = await Promise.all([
                this.jobQuestionAnswerRepository.create({
                    jobQuestionId: questionId,
                    content: answer,
                }, {
                    transaction: t,
                }),
                this.jobRepository.update({
                    id: question.jobId,
                }, {
                    progressAnswer: question.index,
                    status: JobStatus.IN_PROGRESS
                }, {
                    transaction: t,
                }),
            ]);

            if (!answerCreate) {
                throw new HttpException("Create answer failed", StatusCode.INTERNAL_SERVER_ERROR, {
                    description: "Create answer failed"
                })
            }
            return new CreateAnswerQuestionResponseDto(answerCreate);
        })
    }

    async updateJob(id: string, body: UpdateJobInputDto) {
        const update = await this.jobRepository.update({
            id
        }, {
            ...body,
        });
        return update;
    }

    async getJob(id: string) {
        const job = await this.jobRepository.findByPk(id);
        return job;
    }

    async feedbackJob(id: string) {
        const job = await this.jobRepository.getJobQuestions(id);
        if (!job) {
            throw new NotFoundException("Job not found", {
                description: "Job not found"
            })
        }

        if (job.status !== JobStatus.IN_PROGRESS) {
            throw new BadRequestException("Job is not in progress", {
                description: "Job is not in progress"
            })
        }

        const textPrompts: GenerateTextContentDto[] = []

        job.questions.sort((a, b) => a.index - b.index).forEach(question => {
            const anwer = question.answer;

            textPrompts.push({
                role: "model",
                parts: [
                    {
                        text: `[${question.type}-${question.required.toString()}]: ${question.question}`
                    }
                ]
            });

            if (anwer) {
                textPrompts.push({
                    role: "user",
                    parts: [
                        {
                            text: anwer.content
                        }
                    ]
                });
            }
        })



        const feedbackRes = await this.gatewayHttpService.generateText(generateFeedbackPrompt({
            position: job.position,
            description: job.description,
            yearsOfExperience: job.yearsOfExperience,
            questions: [] as any
        }), "gemini", textPrompts);

        if (!feedbackRes) {
            throw new Error("Generate feedback failed");
        }

        const feedbackStr = extractJSONBlock(
            feedbackRes.text
        );

        if (!feedbackStr) {
            throw new Error("JSON block not found in the response text")
        }

        const feedbackParse = safeParseJSON<FeedBackDataPrompt | null>(feedbackStr);

        if (!feedbackParse) {
            throw new Error("JSON parse error")
        }

        return await this.databaseService.transaction(async (t) => {
            const averageScore = (feedbackParse.evaluationByCriteria.reduce((sum, item) => sum + item.score, 0) / feedbackParse.evaluationByCriteria.length);

            const [[feedback, created]] = await Promise.all([
                this.jobFeedbackRepository.findOneCreate({
                    jobId: id,
                }, {
                    content: feedbackParse,
                }, {
                    transaction: t,
                }),
                this.jobRepository.update({
                    id,
                }, {
                    status: JobStatus.COMPLETED,
                    averageScore
                }, {
                    transaction: t,
                })
            ])

            if (!created) {
                throw new BadRequestException("Create feedback failed")
            }

            return {
                id: feedback.id
            };
        })
    }

    async getFeedbackJob(id: string) {
        const feedback = await this.jobFeedbackRepository.findByPk(id);
        if (!feedback) {
            throw new NotFoundException("Feedback not found", {
                description: "Feedback not found"
            })
        }
        const job = await this.jobRepository.findByPk(feedback.jobId);
        if (!job) {
            throw new NotFoundException();
        }
        return {
            ...feedback.content,
            position: job.position,
            description: job.description,
            yearsOfExperience: job.yearsOfExperience,
            averageScore: job.averageScore
        };
    }

    async getJobs(userId: string, params: PaginationDto) {
        const jobs = await this.jobRepository.getJobAndCountAll(params, userId);

        return jobs;
    }

    async deleteJob(id: string) {
        return await this.databaseService.transaction(async (transaction) => {
            const job = await this.jobRepository.getJobIncludes(id);

            if (!job) return null;

            const questions = job.questions;

            const deletePromise: any[] = []

            if (questions.length > 0) {
                const answerId = questions.map(item => item.answer?.id).filter(i => i);
                await this.jobQuestionAnswerRepository.delete({
                    id: answerId
                }, {
                    transaction
                });
                deletePromise.push(
                    this.jobQuestionRepository.delete({
                        jobId: job.id
                    }, {
                        transaction
                    })
                );
                const audioId = questions.map(item => item.audioId);
                deletePromise.push(
                    this.gatewayHttpService.deleteFile(audioId)
                )
            }
            if (job.feedback) {
                deletePromise.push(
                    this.jobFeedbackRepository.delete({
                        id: job.feedback.id
                    }, {
                        transaction
                    })
                )
            }
            await Promise.all(deletePromise);

            const res = await this.jobRepository.delete({
                id
            }, {
                transaction
            });

            if (!res) return null;

            return {
                id
            }
        })
    }
    async getAnalysis(userId: string, params: PaginationDto) {
        return await this.jobRepository.getJobAnalysis(params, userId);
    }
}
