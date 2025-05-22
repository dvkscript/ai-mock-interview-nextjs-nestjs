import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { MailService } from './mail.service';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: configService.systemConfig.emailFrom,
                        pass: configService.systemConfig.emailPassword,
                    },
                },
                defaults: {
                    from: `"AI Mock Interview" <${configService.systemConfig.emailFrom}>`,
                },
            }),

        }),
    ],
    providers: [MailService, ConfigService],
    exports: [MailService],
})
export class MailModule { }