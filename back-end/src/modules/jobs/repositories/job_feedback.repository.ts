import { RepositoryBase } from 'src/libs/db/repository.base';
import { JobFeedbackEntity } from '../entities/job_feedback';

export class JobFeedbackRepository extends RepositoryBase<JobFeedbackEntity> {
    protected getModel() {
        return JobFeedbackEntity;
    }
}