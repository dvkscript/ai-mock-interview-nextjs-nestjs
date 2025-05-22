import { JobEntity } from "../entities/job.entity";
import { RepositoryBase } from "src/libs/db/repository.base";
import { JobQuestionEntity } from "../entities/job_question.entity";
import { CreateJobInputDto } from "../dto/input/create-job.input.dto";
import { JobQuestionAnswerEntity } from "../entities/job_question_answer";
import { JobFeedbackEntity } from "../entities/job_feedback";
import { ExperiencePagination, PaginationDto, ScorePagination } from "../dto/query/pagination.dto";
import { Op } from "sequelize";
import { JobStatus } from "src/modules/shared/enum/job-status";
import { Sequelize } from "sequelize-typescript";

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

    async getJobIncludes(jobId: string): Promise<JobEntity | null> {
        return await this.findByPk(jobId, {
            rejectOnEmpty: false,
            include: [
                {
                    model: JobQuestionEntity,
                    required: true,
                    include: [
                        {
                            model: JobQuestionAnswerEntity,
                        },
                    ]
                },
                {
                    model: JobFeedbackEntity,
                }
            ]
        })
    }

    async getJobAndCountAll(params: PaginationDto, userId: string) {
        const page = +params.page;
        const limit = +params.limit;
        const experience = params.experience;
        const score = params.score;
        const q = params.q;

        const offset = (page - 1) * limit;


        const and: Partial<Record<keyof JobEntity, any>>[] = []

        if (experience !== ExperiencePagination.ALL) {
            if (experience === ExperiencePagination.ZERO) {
                and.push({ yearsOfExperience: 0 })
            }
            if (experience === ExperiencePagination.ONE) {
                and.push({ yearsOfExperience: 1 })
            }
            if (experience === ExperiencePagination.TWO) {
                and.push({ yearsOfExperience: 2 })
            }
            if (experience === ExperiencePagination.THREE) {
                and.push({ yearsOfExperience: 3 })
            }
            if (experience === ExperiencePagination.FOUR) {
                and.push({ yearsOfExperience: 4 })
            }
            if (experience === ExperiencePagination.FIVE_PLUS) {
                and.push({ yearsOfExperience: { [Op.gte]: 5 } })
            }
        }

        if (score !== ScorePagination.ALL) {
            if (score === ScorePagination.EXCELLENT) {
                and.push({ averageScore: { [Op.gte]: 9 } })
            }
            if (score === ScorePagination.GOOD) {
                and.push({ averageScore: { [Op.gte]: 7, [Op.lt]: 9 } })
            }
            if (score === ScorePagination.AVERAGE) {
                and.push({ averageScore: { [Op.gte]: 5, [Op.lt]: 7 } })
            }
            if (score === ScorePagination.POOR) {
                and.push({ averageScore: { [Op.lt]: 5 } })
            }
        }

        if (q) {
            and.push({
                position: {
                    [Op.iLike]: `%${q}%`
                }
            })
        }

        const where: any = {
            userId,
        };

        if (and.length > 0) {
            where[Op.and] = and;
        }

        return await this.findAndCountAll({
            where,
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

    async getJobAnalysis(params: PaginationDto, userId: string) {
        const page = +params.page;
        const limit = +params.limit;
        const offset = (page - 1) * limit;

        const where: any = {
            userId,
        };

        const [jobList, completedCount, notCompletedCount, avgScoreResult] = await Promise.all([
            this.findAndCountAll({
                where,
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
            }),
            this.count({
                userId,
                status: JobStatus.COMPLETED,
            }),
            this.count({
                userId,
                status: {
                    [Op.not]: [JobStatus.COMPLETED, JobStatus.REVIEWED, JobStatus.CANCELLED]
                },
            }),
            this.findOne({
                userId,
                status: JobStatus.COMPLETED,
            }, {
                attributes: [
                    [Sequelize.fn("AVG", Sequelize.col("average_score")), "averageScore"]
                ],
                raw: true,
            })
        ]);

        const avgScore = parseFloat(`${avgScoreResult?.averageScore}` || "0") || 0;

        return {
            count: jobList.count,
            rows: jobList.rows,
            completedCount,
            notCompletedCount,
            avgScore,
        }
    }
}