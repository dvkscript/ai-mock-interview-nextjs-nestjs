import { Controller } from '@nestjs/common';
import { InterviewsService } from './interviews.service';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}
}
