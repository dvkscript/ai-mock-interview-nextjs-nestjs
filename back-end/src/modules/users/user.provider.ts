import { Provider } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { PERMISSION_REPOSITORY, ROLE_REPOSITORY, USER_PROVIDER_REPOSITORY, USER_REPOSITORY, USER_TEMPORARY_PERMISSION_REPOSITORY, USER_TOKEN_REPOSITORY } from "./user.di-tokens";
import { UserProviderRepository } from "./repositories/user_provider.repository";
import { UserTokenRepository } from "./repositories/user_token.repository";
import { UserTemporaryPermissionRepository } from "./repositories/user_temporary_permission.repository";
import { RoleRepository } from "./repositories/role.repository";
import { PermissionRepository } from "./repositories/permission.repository";

export const userProviders: Provider[] = [
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository,
    },
    {
        provide: USER_PROVIDER_REPOSITORY,
        useClass: UserProviderRepository,
    },
    {
        provide: USER_TOKEN_REPOSITORY,
        useClass: UserTokenRepository,
    },
    {
        provide: USER_TEMPORARY_PERMISSION_REPOSITORY,
        useClass: UserTemporaryPermissionRepository,
    },
    {
        provide: ROLE_REPOSITORY,
        useClass: RoleRepository,
    },
    {
        provide: PERMISSION_REPOSITORY,
        useClass: PermissionRepository,
    },
]