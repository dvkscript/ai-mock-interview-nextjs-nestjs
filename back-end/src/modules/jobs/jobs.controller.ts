import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobRequestDto } from './dto/create-job.request.dto';
import { isUUID } from 'class-validator';
import { FindJobQuestionResponse } from './dto/query/find-job_quesion.reponse';
import { CreateAnswerInputDto } from './dto/input/create-answer.input.dto';
import { UpdateJobInputDto } from './dto/input/update-job.input.dto';
import { PaginationDto } from './dto/query/pagination.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('jobs')
@UseGuards(AuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @ApiOperation({ summary: 'Tạo job mới' })
  @ApiResponse({ status: 201, description: 'Tạo job thành công' })
  @Post()
  async create(
    @Body() body: CreateJobRequestDto,
    @Req() req: Request
  ) {
    const user = req.user as any
    const res = await this.jobsService.createJob(user.id, user.fullName, body);
    return res;
  }

  @ApiOperation({ summary: 'Lấy thống kê jobs' })
  @ApiResponse({ status: 200, description: 'Trả về thống kê jobs' })
  @Get("analysis")
  async analysis(
    @Query() paginationDto: PaginationDto,
    @Req() req: Request
  ) {
    const user = req.user as any;
    const res = await this.jobsService.getAnalysis(user.id, paginationDto);
    return res;
  }

  @ApiOperation({ summary: 'Lấy danh sách jobs' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách jobs' })
  @Get()
  async getJobs(
    @Query() paginationDto: PaginationDto,
    @Req() req: Request
  ) {
    const user = req.user as any;
    return await this.jobsService.getJobs(user.id, paginationDto)
  }

  @ApiOperation({ summary: 'Lấy thông tin job và câu hỏi' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin job và câu hỏi' })
  @Get(":jobId")
  async getJobWithQuestion(@Param("jobId") jobId: string): Promise<FindJobQuestionResponse | null> {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }

    const res = await this.jobsService.getJobWithQuestion(jobId);
    
    return res;
  }

  @ApiOperation({ summary: 'Trả lời câu hỏi' })
  @ApiResponse({ status: 201, description: 'Trả lời câu hỏi thành công' })
  @Post("question/answer")
  async answerQuestion(@Body() body: CreateAnswerInputDto) {
    const res = await this.jobsService.createAnswerQuestion(body);
    return res;
  }

  @ApiOperation({ summary: 'Cập nhật job' })
  @ApiResponse({ status: 200, description: 'Cập nhật job thành công' })
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

  @ApiOperation({ summary: 'Tạo feedback cho job' })
  @ApiResponse({ status: 201, description: 'Tạo feedback thành công' })
  @Post(":jobId/feedback")
  async feedbackJob(@Param("jobId") jobId: string) {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }

    return await this.jobsService.feedbackJob(jobId);
  }

  @ApiOperation({ summary: 'Lấy feedback của job' })
  @ApiResponse({ status: 200, description: 'Trả về feedback của job' })
  @Get(":jobId/feedback")
  async getFeedbackJob(@Param("jobId") jobId: string) {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }
    return await this.jobsService.getFeedbackJob(jobId);
  }

  @ApiOperation({ summary: 'Xóa job' })
  @ApiResponse({ status: 200, description: 'Xóa job thành công' })
  @Delete(":jobId")
  async deleteJobs(@Param("jobId") jobId: string): Promise<{ id: string } | null> {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }
    return await this.jobsService.deleteJob(jobId);
  }

  @ApiOperation({ summary: 'Tạo lại bộ câu hỏi' })
  @ApiResponse({ status: 201, description: 'Tạo lại bộ câu hỏi thành công' })
  @Patch(":jobId/recreate")
  async patch(@Param("jobId") jobId: string, @Req() req: Request, @Body() body: { model?: string }) {
    if (!isUUID(jobId)) {
      throw new NotFoundException()
    }
    const user = req.user as any;
    return await this.jobsService.reCreateJob(jobId, user.id, user.fullName, body.model)
  }
}
