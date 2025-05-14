import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '../shared/config/config.service';
import { SEQUELIZE } from './database.di-tokens';
import { JobEntity } from '../jobs/entities/job.entity';
import { JobQuestionEntity } from '../jobs/entities/job_question.entity';
import { JobQuestionAnswerEntity } from '../jobs/entities/job_question_answer';
import { JobFeedbackEntity } from '../jobs/entities/job_feedback';
import { UserEntity } from '../users/entities/user.entity';
import { RoleEntity } from '../users/entities/role.entity';
import { UserRoleEntity } from '../users/entities/user_role.entity';
import { PermissionEntity } from '../users/entities/permission.entity';
import { UserPermissionEntity } from '../users/entities/user_permission.entity';
import { UserTokenEntity } from '../users/entities/user_tokens.entity';
import { UserProviderEntity } from '../users/entities/user_provider.entity';
import { UserProfileEntity } from '../users/entities/user_profile.entity';
import { RolePermissionEntity } from '../users/entities/role_permission.entity';
import { BlacklistEntity } from '../auth/entities/blacklist';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([
                JobEntity,
                JobQuestionEntity,
                JobQuestionAnswerEntity,
                JobFeedbackEntity,
                UserEntity,
                RoleEntity,
                UserRoleEntity,
                PermissionEntity,
                RolePermissionEntity,
                UserPermissionEntity,
                UserTokenEntity,
                UserProviderEntity,
                UserProfileEntity,
                BlacklistEntity,
            ]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];