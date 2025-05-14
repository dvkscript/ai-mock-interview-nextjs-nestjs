import { RepositoryBase } from "src/libs/db/repository.base";
import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { DatabaseService } from "src/modules/database/database.service";
import { Inject } from "@nestjs/common";
import { SEQUELIZE } from "src/modules/database/database.di-tokens";
import { UserProfileEntity } from "../entities/user_profile.entity";

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
}