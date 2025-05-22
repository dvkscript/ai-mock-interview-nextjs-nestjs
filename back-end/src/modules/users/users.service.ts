import { Inject, Injectable } from '@nestjs/common';
import { PERMISSION_REPOSITORY, USER_PROVIDER_REPOSITORY, USER_REPOSITORY, USER_TEMPORARY_PERMISSION_REPOSITORY, USER_TOKEN_REPOSITORY } from './user.di-tokens';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserTokenDto } from './dto/create-user_token.dto';
import { UserProviderRepository } from './repositories/user_provider.repository';
import { UserTokenRepository } from './repositories/user_token.repository';
import { DatabaseService } from '../database/database.service';
import { UserProfileEntity } from './entities/user_profile.entity';
import { UserTemporaryPermissionRepository } from './repositories/user_temporary_permission.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { PeriodPayInput } from '../pay/dto/create-pay.input.dto';
import { UserRole } from '../shared/enum/role';
import { Op } from 'sequelize';
import * as dayjs from 'dayjs';
import { UsersRolesParamsDto } from './dto/users-roles-params';


@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(USER_PROVIDER_REPOSITORY)
        private readonly userProviderRepository: UserProviderRepository,
        @Inject(USER_TOKEN_REPOSITORY)
        private readonly userTokenRepository: UserTokenRepository,
        @Inject(USER_TEMPORARY_PERMISSION_REPOSITORY)
        private readonly userTemporaryPermissionRepository: UserTemporaryPermissionRepository,
        @Inject(PERMISSION_REPOSITORY)
        private readonly permissionRepository: PermissionRepository,
        private readonly databaseService: DatabaseService,
    ) { }

    async createUserToken(token: string, userId: string) {
        return await this.userTokenRepository.create({
            refreshToken: token,
            userId
        })
    }

    async createUser(data: CreateUserDto, options?: DatabaseOptionType) {
        return await this.userRepository.createUser(data, options)
    }

    async createToken(data: CreateUserTokenDto) {
        return await this.databaseService.transaction(async (transaction) => {
            const { refreshToken, provider, userId } = data;

            const [
                userProvider,
                userToken,
            ] = await Promise.all([
                this.userProviderRepository.create({
                    name: provider,
                    userId
                }, {
                    transaction
                }),
                this.userTokenRepository.create({
                    refreshToken,
                    userId
                }, {
                    transaction
                }),
            ]);

            if (!userProvider || !userToken) {
                throw new Error("User token failed")
            }

            return {
                userProvider,
                userToken,
            }
        })
    }

    getRefreshToken(refreshToken: string) {
        return this.userTokenRepository.findOne({
            refreshToken
        })
    }

    deleteRefreshToken(refreshToken: string) {
        return this.userTokenRepository.delete({
            refreshToken
        })
    }

    getProfile(userId: string) {
        return this.userRepository.findOne({
            id: userId
        }, {
            include: [
                {
                    model: UserProfileEntity,
                    required: false,
                }
            ]
        })
    }

    getUser(id: string) {
        return this.userRepository.findByPk(id);
    }

    async userActivatePro(userId: string, period: PeriodPayInput) {
        const [permission] = await this.permissionRepository.findOneCreate({
            value: UserRole.PRO
        }, {
            value: UserRole.PRO
        });
        if (!permission) {
            throw new Error("Invalid Server Error")
        };

        const now = new Date();
        const duration = period === PeriodPayInput.YEARLY ? 1 : 30;
        const unit = period === PeriodPayInput.YEARLY ? 'year' : 'day';

        const existing = await this.userTemporaryPermissionRepository.findOne({
            userId,
            permissionId: permission.id,
            endTime: { [Op.gt]: now },
        }, {
            order: [['endTime', 'DESC']],
        });
        
        if (existing) {
            return await this.userTemporaryPermissionRepository.create({
                permissionId: permission.id,
                userId: existing.userId,
                startTime: existing.endTime,
                endTime: dayjs(existing.endTime).add(duration, unit).toDate(),
            });
        }
        return await this.userTemporaryPermissionRepository.create({
            userId,
            permissionId: permission.id,
            startTime: now,
            endTime: dayjs(now).add(duration, unit).toDate(),
        });
    }
    async getValidPermissions(userId: string) {
        const res = await this.userTemporaryPermissionRepository.getValidPermissions(userId)
        return res.map(p => p.permission.value);
    }

    async getUsersRoles(params: UsersRolesParamsDto) {
        return this.userRepository.getUsersRoles(params);
    }
}
