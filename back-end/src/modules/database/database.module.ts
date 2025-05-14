import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SharedModule } from '../shared/shared.module';
import { databaseProviders } from './database.providers';

@Module({
  imports: [SharedModule],
  providers: [...databaseProviders, DatabaseService],
  exports: [...databaseProviders, DatabaseService],
})
export class DatabaseModule {}
