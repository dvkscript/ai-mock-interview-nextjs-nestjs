import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../users/user.di-tokens';
import { RoleRepository } from '../users/repositories/role.repository';

@Injectable()
export class RolesService {
    constructor(
        @Inject(ROLE_REPOSITORY)
        private readonly roleRepository: RoleRepository,
    ) { }

    async getRoles() {
        return await this.roleRepository.findAll();
    }
}
