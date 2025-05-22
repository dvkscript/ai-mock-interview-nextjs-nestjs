import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }


    async sendMail(to: string, subject: string, html: string) {
        await this.mailerService.sendMail({
            to, 
            subject: subject,
            html
        });
    }
}