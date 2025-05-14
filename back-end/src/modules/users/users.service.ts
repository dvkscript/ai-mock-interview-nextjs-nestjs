import { Inject, Injectable } from '@nestjs/common';
import { USER_PROVIDER_REPOSITORY, USER_REPOSITORY, USER_TOKEN_REPOSITORY } from './user.di-tokens';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserTokenDto } from './dto/create-user_token.dto';
import { UserProviderRepository } from './repositories/user_provider.repository';
import { UserTokenRepository } from './repositories/user_token.repository';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(USER_PROVIDER_REPOSITORY)
        private readonly userProviderRepository: UserProviderRepository,
        @Inject(USER_TOKEN_REPOSITORY)
        private readonly userTokenRepository: UserTokenRepository,
        private readonly databaseService: DatabaseService,
    ) { }

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
}
