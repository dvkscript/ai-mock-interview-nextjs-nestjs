import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...userProviders,
    PermissionsGuard
  ],
  exports: [
    UsersService,
    PermissionsGuard
  ]
})
export class UsersModule {}
