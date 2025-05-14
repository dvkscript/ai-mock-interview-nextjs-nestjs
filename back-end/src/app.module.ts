import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './libs/api/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './libs/api/filters/any-exception.filter';
import { HttpExceptionFilter } from './libs/api/filters/http-exception.filter';
import { JobsModule } from './modules/jobs/jobs.module';
import { SharedModule } from './modules/shared/shared.module';
import { DatabaseModule } from './modules/database/database.module';
import { InterviewsModule } from './modules/interviews/interviews.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [JobsModule, SharedModule, DatabaseModule, InterviewsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
