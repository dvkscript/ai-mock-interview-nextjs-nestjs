import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PAY_REPOSITORY } from './user.di-tokens';
import { PayRepository } from './repositories/pay.repository';

@Module({
  imports: [SharedModule, AuthModule, SharedModule, UsersModule],
  controllers: [PayController],
  providers: [PayService,
    {
      provide: PAY_REPOSITORY,
      useClass: PayRepository
    }
  ],
  exports: [PayService]
})
export class PayModule {}
