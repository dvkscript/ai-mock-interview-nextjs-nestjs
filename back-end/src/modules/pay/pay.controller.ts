import { Controller, Post, Body, Get, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { PayService } from './pay.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePayInputDto } from './dto/create-pay.input.dto';
import { Request } from 'express';
import { isUUID } from 'class-validator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('pay')
@UseGuards(AuthGuard)
@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @ApiOperation({ summary: 'Tạo payment intent' })
  @ApiResponse({ status: 201, description: 'Tạo payment intent thành công' })
  @Post()
  async createPaymentIntent(
    @Body() body: CreatePayInputDto,
    @Req() req: Request
  ) {
    const user = req.user as { email: string, fullName: string, id: string };
    
    return await this.payService.createPaymentIntent(body.period, body.paymentMethodId, user);
  }

  @ApiOperation({ summary: 'Lấy thông tin thanh toán' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin thanh toán' })
  @Get(":id")
  async getPay(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new NotFoundException("Payment not found");
    }
    return await this.payService.getPay(id);
  }
}
