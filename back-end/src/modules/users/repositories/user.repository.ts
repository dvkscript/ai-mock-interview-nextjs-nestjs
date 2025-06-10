import { RepositoryBase } from "src/libs/db/repository.base";
import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { DatabaseService } from "src/modules/database/database.service";
import { Inject } from "@nestjs/common";
import { SEQUELIZE } from "src/modules/database/database.di-tokens";
import { UserProfileEntity } from "../entities/user_profile.entity";
import { UsersRolesParamsDto } from "../dto/users-roles-params";
import { Op } from "sequelize";
import { RoleEntity } from "../entities/role.entity";
import { PermissionEntity } from "../entities/permission.entity";
import { UserTemporaryPermissionEntity } from "../entities/users_temporary_permissions";
import { UserProviderEntity } from "../entities/user_provider.entity";

export class UserRepository extends RepositoryBase<UserEntity> {
    constructor(
        @Inject(SEQUELIZE)
        private readonly databaseService: DatabaseService,
    ) {
        super();
    }

    protected getModel() {
        return UserEntity;
    }

    async createUser(data: CreateUserDto, options?: DatabaseOptionType): Promise<[UserEntity | null, boolean]> {
        return await this.databaseService.transaction(async (t) => {
            const { email, fullName, password = "", thumbnail } = data;

            const res = {
                create: false,
                user: await this.findOne({
                    email
                }),
            }

            if (res.user) {
                return [res.user, res.create];
            }

            const profile: Record<string, string> = {};

            if (thumbnail) {
                profile.thumbnail = thumbnail;
            }

            const newUser = await this.create({
                email,
                fullName,
                password,
                profile
            }, {
                include: [
                    {
                        model: UserProfileEntity
                    }
                ],
                transaction: options?.transaction
            });
            return [newUser, true];
        })
    }

    async getUserList(params: UsersRolesParamsDto) {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const offset = (page - 1) * limit;
        const q = params.q || '';



        return await this.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        email: {
                            [Op.iLike]: `%${q}%`
                        }
                    },
                    {
                        fullName: {
                            [Op.iLike]: `%${q}%`
                        }
                    }
                ],
            },
            include: [
                {
                    model: RoleEntity,
                    required: false,
                    attributes: {
                        exclude: ["userId"]
                    }
                },
                {
                    model: UserProfileEntity,
                    required: false,
                    attributes: {
                        exclude: ["userId"]
                    }
                },
                {
                    model: UserProviderEntity,
                    required: false,
                    separate: true,           // Quan trọng: tách query riêng
                    limit: 1,                 // Chỉ lấy 1 bản ghi
                    order: [['createdAt', 'DESC']], // Hoặc theo id nếu muốn
                    attributes: {
                        exclude: ["userId"]
                    }
                }
            ],
            offset,
            limit,
            order: [
                ['id', 'DESC']
            ],
        })
    }

    async getUserAuthProfile(userId: string) {
        return await this.findByPk(userId, {
            rejectOnEmpty: false,
            include: [
                {
                    model: UserProfileEntity,
                    required: false
                },
                {
                    model: RoleEntity,
                    required: false,
                    include: [
                        {
                            model: PermissionEntity,
                            required: false,
                        }
                    ]
                },
                {
                    model: PermissionEntity,
                    required: false,
                },
                {
                    model: UserTemporaryPermissionEntity,
                    required: false,
                    where: {
                        startTime: {
                            [Op.lte]: new Date()
                        },
                        endTime: {
                            [Op.gt]: new Date()
                        }
                    },
                    include: [
                        {
                            model: PermissionEntity,
                            required: false,
                        }
                    ]
                }
            ]
        })
    }

    async getUserDetails(userId: string) {
        return await this.findByPk(userId, {
            rejectOnEmpty: false,
            include: [
                {
                    model: UserProfileEntity,
                    required: false
                },
                {
                    model: RoleEntity,
                    required: false,
                },
                {
                    model: UserTemporaryPermissionEntity,
                    required: false,
                    include: [
                        {
                            model: PermissionEntity,
                            required: false,
                        }
                    ],
                    where: {
                        startTime: {
                            [Op.lte]: new Date()
                        },
                        endTime: {
                            [Op.gt]: new Date()
                        }
                    }
                }
            ]
        })
    }
}