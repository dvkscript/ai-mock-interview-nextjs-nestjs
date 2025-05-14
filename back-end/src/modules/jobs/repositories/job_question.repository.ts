import { RepositoryBase } from "src/libs/db/repository.base";
import { JobQuestionEntity } from "../entities/job_question.entity";

export class JobQuestionRepository extends RepositoryBase<JobQuestionEntity> {
    protected getModel() {
        return JobQuestionEntity;
    }

    async getJobQuestions(jobId: string) {
        return await this.findAll({
            where: {
                jobId
            },
            order: [
                ['index', 'ASC']
            ]
        })
    }
}