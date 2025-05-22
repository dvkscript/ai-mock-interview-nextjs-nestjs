import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [HttpModule, MailModule, ConfigModule],
  exports: [ConfigModule, HttpModule, MailModule]
})
export class SharedModule {}
