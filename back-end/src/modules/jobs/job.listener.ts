import { HttpException, Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateJobListenerDto } from "./dto/input/create-job.listener.dto";
import { generateQuestionDefaultPrompt, generateQuestionPrompt, QuestionDataPrompt } from "./job.prompt";
import { GatewayHttpService } from "../shared/http/gateway-http.service";
import { extractJSONBlock, safeParseJSON } from "src/libs/utils/json";
import { StatusCode } from "src/libs/exceptions/codes.exception";
import { JOB_QUESTION_REPOSITORY, JOB_REPOSITORY } from "./job.di-tokens";
import { JobRepository } from "./repositories/job.respository";
import { JobStatus } from "../shared/enum/job-status";
import { JobQuestionRepository } from "./repositories/job_question.repository";
import { DatabaseService } from "../database/database.service";

export const JOB_CREATED = 'job.created';

@Injectable()
export class JobListener {
    constructor(
        private readonly gatewayHttpService: GatewayHttpService,
        @Inject(JOB_REPOSITORY)
        private readonly jobRepository: JobRepository,
        @Inject(JOB_QUESTION_REPOSITORY)
        private readonly jobQuestionRepository: JobQuestionRepository,
        private readonly databaseService: DatabaseService,
    ) { }

    @OnEvent(JOB_CREATED)
    async handleJobCreated(job: CreateJobListenerDto) {
        const { id, userId, ...rest } = job;
        const audioIdUploaded: string[] = [];

        try {
            const prompt = generateQuestionPrompt({
                ...rest
            });
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

            const questions = await Promise.all(
                questionParse.map(async (item) => {
                    const audio = await this.gatewayHttpService.convertTextToSpeech(item.question);
                    const uploaded = await this.gatewayHttpService.uploadFile(userId, audio);
                    audioIdUploaded.push(uploaded.id);
                    return {
                        ...item,
                        audioUrl: uploaded.url,
                        audioId: uploaded.id,
                        jobId: id,
                    }
                })
            );
            return await this.databaseService.transaction(async (transaction) => {
                await Promise.all([
                    this.jobQuestionRepository.bulkCreate(questions, {
                        transaction
                    }),
                    this.jobRepository.update({
                        id
                    }, {
                        status: JobStatus.NOT_STARTED,
                    }, {
                        transaction
                    })
                ])
            })

        } catch (error) {
            console.error(error);
            
            if (audioIdUploaded.length > 0) {
                await this.gatewayHttpService.deleteFile(audioIdUploaded);
            }
            await this.jobRepository.update({
                id
            }, {
                status: JobStatus.CREATE_FAILED
            });

        }
    }
}
