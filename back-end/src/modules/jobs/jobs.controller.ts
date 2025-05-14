import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobRequestDto } from './dto/create-job.request.dto';
import { isUUID } from 'class-validator';
import { FindJobQuestionResponse } from './dto/query/find-job_quesion.reponse';
import { CreateAnswerInputDto } from './dto/input/create-answer.input.dto';
import { UpdateJobInputDto } from './dto/input/update-job.input.dto';
import { PaginationDto } from './dto/query/pagination.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  async create(@Body() body: CreateJobRequestDto) {
    const res = await this.jobsService.createJob("8358cbb6-6054-4cb3-aac2-fa43bef988aa", body);
    return res;
  }

  @Get(":jobId")
  async getJobWithQuestion(@Param("jobId") jobId: string): Promise<FindJobQuestionResponse | null> {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }

    const res = await this.jobsService.getJobWithQuestion(jobId);
    return res;
  }

  @Post("question/answer")
  async answerQuestion(@Body() body: CreateAnswerInputDto) {
    const res = await this.jobsService.createAnswerQuestion(body);
    return res;
  }

  @Patch(":jobId")
  async updateJob(@Param("jobId") jobId: string, @Body() body: UpdateJobInputDto) {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }
    const job = await this.jobsService.getJob(jobId);
    if (!job) {
      throw new NotFoundException()
    }
    return await this.jobsService.updateJob(job.id, body);
  }

  @Post(":jobId/feedback")
  async feedbackJob(@Param("jobId") jobId: string) {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }

    return await this.jobsService.feedbackJob(jobId);
  }

  @Get(":jobId/feedback")
  async getFeedbackJob(@Param("jobId") jobId: string) {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }
    return await this.jobsService.getFeedbackJob(jobId);
  }

  @Get()
  async getJobs(
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.jobsService.getJobs("8358cbb6-6054-4cb3-aac2-fa43bef988aa", paginationDto)
  }
}
