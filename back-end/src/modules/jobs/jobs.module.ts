import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JOB_FEEDBACK_REPOSITORY, JOB_QUESTION_ANSWER_REPOSITORY, JOB_QUESTION_REPOSITORY, JOB_REPOSITORY } from './job.di-tokens';
import { JobRepository } from './repositories/job.respository';
import { JobQuestionRepository } from './repositories/job_question.repository';
import { SharedModule } from '../shared/shared.module';
import { JobQuestionAnswerRepository } from './repositories/job_question_answer.repository';
import { DatabaseModule } from '../database/database.module';
import { JobFeedbackRepository } from './repositories/job_feedback.repository';
import { AuthModule } from '../auth/auth.module';

const providers = [
  {
    provide: JOB_REPOSITORY,
    useClass: JobRepository
  },
  {
    provide: JOB_QUESTION_REPOSITORY,
    useClass: JobQuestionRepository
  },
  {
    provide: JOB_QUESTION_ANSWER_REPOSITORY,
    useClass: JobQuestionAnswerRepository
  },
  {
    provide: JOB_FEEDBACK_REPOSITORY,
    useClass: JobFeedbackRepository
  }
]

@Module({
  imports: [SharedModule, DatabaseModule, AuthModule],
  controllers: [JobsController],
  providers: [
    ...providers,
    JobsService,
  ],
})
export class JobsModule { }
