import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERMISSION_REPOSITORY, ROLE_REPOSITORY } from '../users/user.di-tokens';
import { RoleRepository } from '../users/repositories/role.repository';
import { PermissionRepository } from '../users/repositories/permission.repository';
import { DatabaseService } from '../database/database.service';
import { CreateRoleInputDto } from './dto/create-role.input.dto';
import { SearchRoleQueryInput } from '../users/dto/query/search-role.query.input';


@Injectable()
export class AdminService {
    constructor(
        @Inject(ROLE_REPOSITORY)
        private readonly roleRepository: RoleRepository,
        @Inject(PERMISSION_REPOSITORY)
        private readonly permissionRepository: PermissionRepository,
        private readonly databaseService: DatabaseService,
    ) { }

    async createRole(body: CreateRoleInputDto) {
        const permissions = await this.permissionRepository.findAll({
            where: {
                value: body.permissions
            }
        });

        const newPermissions = body.permissions.filter((p) => !permissions.find(item => item.value === p)).map(p => ({ value: p }));

        return await this.databaseService.transaction(async (transaction) => {
            const [role, permissions] = await Promise.all([
                this.roleRepository.create({
                    name: body.name,
                }, {
                    transaction
                }),
                this.permissionRepository.bulkCreate(newPermissions, {
                    transaction
                })
            ]);
            if (!role) {
                throw new ConflictException('Role already exists');
            }

            return {
                id: role.id,
            }
        })
    }

    async getRoleAndCountAll(searchParams: SearchRoleQueryInput) {
        return await this.roleRepository.getRoleAndCountAll(searchParams);
    }
}
