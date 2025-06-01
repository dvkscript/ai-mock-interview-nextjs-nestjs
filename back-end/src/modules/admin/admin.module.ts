import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule
  ],
  controllers: [AdminController],
  providers: [
    AdminService
  ],
})
export class AdminModule {}
