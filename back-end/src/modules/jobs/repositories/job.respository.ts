import { JobEntity } from "../entities/job.entity";
import { RepositoryBase } from "src/libs/db/repository.base";
import { JobQuestionEntity } from "../entities/job_question.entity";
import { CreateJobInputDto } from "../dto/input/create-job.input.dto";
import { JobQuestionAnswerEntity } from "../entities/job_question_answer";
import { JobFeedbackEntity } from "../entities/job_feedback";

export class JobRepository extends RepositoryBase<JobEntity> {
    protected getModel() {
        return JobEntity;
    }

    async createJob(job: CreateJobInputDto) {
        const res = await this.create(job, {
            include: {
                model: JobQuestionEntity,
                as: "questions",
                required: true
            }
        });
        return {
            id: res.id
        };
    }

    async getJobQuestions(jobId: string): Promise<JobEntity | null> {
        return await this.findByPk(jobId, {
            rejectOnEmpty: false,
            include: [
                {
                    model: JobQuestionEntity,
                    required: true,
                    include: [
                        {
                            model: JobQuestionAnswerEntity,
                        }
                    ]
                }
            ]
        })
    }

    async getJobAndCountAll(params: Record<string, any>, userId: string) {
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || 10;

        const offset = (page - 1) * limit;

        return await this.findAndCountAll({
            where: {
                userId
            },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: JobFeedbackEntity,
                    as: "feedback",
                    attributes: ["id"],
                }
            ],
        })
    }
}