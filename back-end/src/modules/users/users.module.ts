import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { PERMISSION_REPOSITORY, ROLE_REPOSITORY, USER_REPOSITORY } from './user.di-tokens';
import { UserListener } from './user.listener';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    SharedModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...userProviders,
    UserListener
  ],
  exports: [
    UsersService,
    ROLE_REPOSITORY,
    PERMISSION_REPOSITORY,
    USER_REPOSITORY
  ]
})
export class UsersModule {}
