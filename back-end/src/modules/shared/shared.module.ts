import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule],
  providers: [ConfigService],
  exports: [ConfigService, HttpModule]
})
export class SharedModule {}
