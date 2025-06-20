import { Inject, Injectable } from '@nestjs/common';
import { PERMISSION_REPOSITORY, USER_PROFILE_REPOSITORY, USER_PROVIDER_REPOSITORY, USER_REPOSITORY, USER_TEMPORARY_PERMISSION_REPOSITORY, USER_TOKEN_REPOSITORY } from './user.di-tokens';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserTokenDto } from './dto/create-user_token.dto';
import { UserProviderRepository } from './repositories/user_provider.repository';
import { UserTokenRepository } from './repositories/user_token.repository';
import { DatabaseService } from '../database/database.service';
import { UserTemporaryPermissionRepository } from './repositories/user_temporary_permission.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { PeriodPayInput } from '../pay/dto/create-pay.input.dto';
import { UserRole } from '../shared/enum/role';
import { Op } from 'sequelize';
import * as dayjs from 'dayjs';
import { UsersRolesParamsDto } from './dto/users-roles-params';
import { GetUserListQueryReponse } from './dto/query/get-userList.query.response';
import { UpdateProfile } from './dto/input/update-user.input';
import { UserProfileRepository } from './repositories/user_profile.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FILE_DELETE } from './user.listener';


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
        @Inject(USER_PROFILE_REPOSITORY)
        private readonly userProfileRepository: UserProfileRepository,
        private readonly databaseService: DatabaseService,
        private readonly eventEmitter: EventEmitter2
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

    async getUserList(params: UsersRolesParamsDto) {
        const res = await this.userRepository.getUserList(params);

        if (!res) {
            throw new Error("Invalid Server Error")
        }

        return {
            count: res.count,
            rows: res.rows.map(row => {
                return new GetUserListQueryReponse(row);
            })
        }
    }

    async getRoleNamesByUserId(userId: string) {
        const res = await this.userRepository.getUserWithRoles(userId);

        const userRoles = res?.roles || [];

        return userRoles.map(r => r.name);
    }

    async updateProfile(userId: string, body: UpdateProfile) {
        return await this.databaseService.transaction(async (transaction) => {
            const { thumbnail, thumbnailId, fullName } = body;

            if (!!fullName) {
                await this.userRepository.update({
                    id: userId
                }, {
                    fullName
                }, {
                    transaction
                })
            };
            if (thumbnail) {
                const profile = await this.userProfileRepository.getProfileByUserId(userId);

                const data: Record<string, string> = {
                    thumbnail,
                };

                if (thumbnailId) {
                    data.thumbnailId = thumbnailId;
                }

                if (profile) {
                    await this.userProfileRepository.update({
                        userId
                    }, data, {
                        transaction
                    });

                    if (profile.thumbnailId) {
                        this.eventEmitter.emit(FILE_DELETE, profile.thumbnailId)
                    }
                } else {
                    await this.userProfileRepository.create({
                        userId,
                        ...data
                    }, {
                        transaction
                    })
                }
            };

            return {
                id: userId
            }
        })
    }
}
