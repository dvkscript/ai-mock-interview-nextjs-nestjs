import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERMISSION_REPOSITORY, ROLE_REPOSITORY, USER_REPOSITORY } from '../users/user.di-tokens';
import { RoleRepository } from '../users/repositories/role.repository';
import { PermissionRepository } from '../users/repositories/permission.repository';
import { DatabaseService } from '../database/database.service';
import { CreateRoleInputDto } from './dto/input/create-role.input.dto';
import { SearchRoleQueryInput } from '../users/dto/query/search-role.query.input';
import { GetRoleResponseQuery } from './dto/query/get-role.response.query';
import { UserRepository } from '../users/repositories/user.repository';
import { UsersRolesParamsDto } from '../users/dto/users-roles-params';
import { GetUserListQueryReponse } from '../users/dto/query/get-userList.query.response';
import { GetUserDetailsResponseQuery } from './dto/query/get-userDetails.response.query';
import { UpdateUserInput } from './dto/input/update-user.input';
import { JobsService } from '../jobs/jobs.service';
import { GetJobsPaginationQuery } from '../jobs/dto/query/get-jobs.pagination.query';
import { GetJobsResponseQuery } from './dto/query/get-jobs.response.query';
import { PayService } from '../pay/pay.service';
import { GetPayWithUserAndCountAllQuery } from '../pay/dto/query/get-payWithUserAndCountAll.query';
import { GetPaysQueryResponse } from './dto/query/get-pays.query.response';
import { GetAnalysisQueryResponse } from './dto/query/get-analysis.query.response';
import { UsersService } from '../users/users.service';
import { PermissionEntity } from '../users/entities/permission.entity';


@Injectable()
export class AdminService {
    constructor(
        @Inject(ROLE_REPOSITORY)
        private readonly roleRepository: RoleRepository,
        @Inject(PERMISSION_REPOSITORY)
        private readonly permissionRepository: PermissionRepository,
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly jobService: JobsService,
        private readonly databaseService: DatabaseService,
        private readonly payService: PayService,
        private readonly userService: UsersService
    ) { }

    async createRole(body: CreateRoleInputDto) {
        const permissions = await this.permissionRepository.findAll({
            where: {
                value: body.permissions
            }
        });

        const newPermissions = body.permissions.filter((p) => !permissions.find(item => item.value === p)).map(p => ({ value: p }));

        return await this.databaseService.transaction(async (transaction) => {
            const [role, createdPermissions] = await Promise.all([
                this.roleRepository.create({
                    name: body.name,
                }, {
                    transaction
                }),
                newPermissions.length > 0 && this.permissionRepository.bulkCreate(newPermissions, {
                    transaction
                })
            ]);
            if (!role) {
                throw new ConflictException('Role already exists');
            }

            const allPermissions = [
                ...permissions,
                ...createdPermissions || []
            ];

            await role.setPermissions(allPermissions, { transaction });

            return {
                id: role.id,
            }
        })
    }

    async getRoleAndCountAll(searchParams: SearchRoleQueryInput) {
        return await this.roleRepository.getRoleAndCountAll(searchParams);
    }

    async deleteRole(ids: string[]) {
        const res = await this.roleRepository.delete({
            id: ids
        });
        if (!res) {
            throw new NotFoundException('Role not found');
        }
        return {
            id: ids
        }
    }

    async getRole(roleId: string) {
        const role = await this.roleRepository.getRoleWithPermissions(roleId);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return new GetRoleResponseQuery(role);
    }

    async updateRole(roleId: string, body: CreateRoleInputDto) {
        return await this.databaseService.transaction(async (transaction) => {
            const existingPermissions = await this.permissionRepository.findAll({
                where: {
                    value: body.permissions
                },
                transaction
            });

            const permissionNotFoundValues = body.permissions.filter((p) => !existingPermissions.find(item => item.value === p));

            let createdPermissions: PermissionEntity[] = [];

            if (permissionNotFoundValues.length > 0) {
                createdPermissions = await this.permissionRepository.bulkCreate(permissionNotFoundValues.map(p => ({ value: p })), {
                    transaction
                });
            }

            const role = await this.roleRepository.getRoleWithPermissions(roleId);

            if (!role) {
                throw new NotFoundException('Role not found');
            }

            const allPermissions = [...existingPermissions, ...createdPermissions];

            await Promise.all([
                role.setPermissions(allPermissions, {
                    transaction,
                }),
                this.roleRepository.update({
                    id: roleId
                }, {
                    name: body.name
                }, {
                    transaction
                })
            ])

            return {
                id: roleId
            }
        })
    }

    async getUsers(searchParams: UsersRolesParamsDto) {
        const res = await this.userRepository.getUserList(searchParams);

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

    async getUser(userId: string) {
        const user = await this.userRepository.getUserDetails(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return new GetUserDetailsResponseQuery(user);
    }

    async updateUser(userId: string, body: UpdateUserInput) {
        const user = await this.userRepository.findByPk(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.databaseService.transaction(async (transaction) => {
            await this.userRepository.update({
                id: userId
            }, {
                fullName: body.fullName,
                email: body.email,
                password: body.password || "",
            }, {
                transaction
            });
            if (body.roles.length > 0) {
                await user.setRoles(body.roles, {
                    transaction
                });
            }

            return {
                id: userId
            }
        })
    }

    async getAnalysis(limit: string = "5") {
        const [userCount, jobCount, feedbackCount, payTotalAmount, providers] = await Promise.all([
            this.userRepository.count(),
            this.jobService.totalCount(),
            this.jobService.feedbackCount(),
            this.payService.totalAmount(),
            this.userService.getUserUptimes(+limit || 5),
        ]);

        return new GetAnalysisQueryResponse({
            userCount,
            jobCount,
            feedbackCount,
            payTotalAmount,
            providers
        });
    }

    async getJobs(params: GetJobsPaginationQuery) {
        const res = await this.jobService.getJobsWithUser(params);

        if (!res) {
            throw new Error("Invalid Server Error")
        }

        return {
            count: res.count,
            rows: res.rows.map(row => {
                return new GetJobsResponseQuery(row);
            })
        }
    }

    async getPays(params: GetPayWithUserAndCountAllQuery) {
        const res = await this.payService.getPayWithUserAndCountAll(params);

        if (!res) {
            throw new Error("Invalid Server Error")
        }

        return {
            count: res.count,
            rows: res.rows.map(row => {
                return new GetPaysQueryResponse(row);
            })
        }
    }
}
