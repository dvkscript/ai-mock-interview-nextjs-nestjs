import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '../shared/config/config.service';
import { PeriodPayInput } from './dto/create-pay.input.dto';
import { MailService } from '../shared/mail/mail.service';
import { UsersService } from '../users/users.service';
import { PayRepository } from './repositories/pay.repository';
import { PAY_REPOSITORY } from './user.di-tokens';
import * as dayjs from 'dayjs';

const sendMailHtml = (
  amount: number,
  userName: string,
  period: string,
  startDate: Date,
  endDate: Date
) => {
  return `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Thanh toán thành công</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f8fa;
        padding: 20px;
        color: #333;
      }
      .container {
        background-color: #ffffff;
        border-radius: 10px;
        padding: 30px;
        max-width: 600px;
        margin: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .header h1 {
        color: #22bb33;
      }
      .details {
        margin-top: 20px;
        font-size: 16px;
        line-height: 1.6;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎉 Thanh toán thành công!</h1>
        <p>Cảm ơn bạn đã sử dụng <strong>AI Mock Interview</strong></p>
      </div>
      <div class="details">
        <p>Xin chào <strong>${userName}</strong>,</p>
        <p>Bạn đã thanh toán thành công với số tiền:</p>
        <p><strong>${amount.toLocaleString('vi-VN')} VND</strong></p>
        <p>Gói bạn đã đăng ký: <strong>${period}</strong></p>
        <p>⏱ Thời gian sử dụng:</p>
        <ul>
          <li>Bắt đầu: <strong>${dayjs(startDate).format("HH:mm - DD/MM/YYYY")}</strong></li>
          <li>Kết thúc: <strong>${dayjs(endDate).format("HH:mm - DD/MM/YYYY")}</strong></li>
        </ul>
      </div>
      <div class="footer">
        <p>Nếu có bất kỳ thắc mắc nào, bạn có thể phản hồi lại email này hoặc liên hệ chúng tôi qua fanpage.</p>
        <p>Trân trọng,<br />Đội ngũ AI Mock Interview</p>
      </div>
    </div>
  </body>
  </html>
  `;
};


@Injectable()
export class PayService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
    @Inject(PAY_REPOSITORY)
    private readonly payRepo: PayRepository,
  ) {
    this.stripe = new Stripe(this.configService.systemConfig.stripeSecretKey);
  }

  async createPaymentIntent(period: PeriodPayInput, paymentMethodId: Stripe.PaymentIntentCreateParams["payment_method"], user: { id: string, email: string, fullName: string }) {
    try {
      const amount = period === PeriodPayInput.YEARLY ? 1990000 : 199000;
      const paymentIntent = await this.stripe.paymentIntents.create({
        confirm: true,
        currency: "vnd",
        amount,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        payment_method: paymentMethodId,
        receipt_email: user.email,
      });

      if (!paymentIntent) {
        throw new Error("Pay error");
      }

      const permissionDate = await this.userService.userActivatePro(user.id, period);
      
      this.mailService.sendMail(user.email, 'Thanh toán thành công!', sendMailHtml(amount, user.fullName, period, permissionDate.startTime, permissionDate.endTime))

      return await this.payRepo.create({
        amount: paymentIntent.amount,
        amountReceived: paymentIntent.amount_received,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        paymentMethod: paymentIntent.payment_method,
        paymentMethodTypes: paymentIntent.payment_method_types,
        latestCharge: paymentIntent.latest_charge,
        receiptEmail: paymentIntent.receipt_email,
        description: period,
        userId: permissionDate.userId,
      })
    } catch (error) {
      throw new Error(`Payment intent creation failed: ${error.message}`);
    }
  }

  async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      throw new Error(`Confirm payment failed: ${error.message}`);
    }
  }

  async getPay(id: string) {
    const res = await this.payRepo.findOne({
      id,
    });
    if (!res) {
      throw new NotFoundException()
    }
    return res;
  }

  
}
