import { RepositoryBase } from 'src/libs/db/repository.base';
import { JobQuestionAnswerEntity } from './../entities/job_question_answer';

export class JobQuestionAnswerRepository extends RepositoryBase<JobQuestionAnswerEntity> {
    protected getModel() {
        return JobQuestionAnswerEntity;
    }
}