import { Provider } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { USER_PROVIDER_REPOSITORY, USER_REPOSITORY, USER_TOKEN_REPOSITORY } from "./user.di-tokens";
import { UserProviderRepository } from "./repositories/user_provider.repository";
import { UserTokenRepository } from "./repositories/user_token.repository";

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
]