import { RepositoryBase } from "src/libs/db/repository.base";
import { UserProviderEntity } from "../entities/user_provider.entity";
import { UserEntity } from "../entities/user.entity";
import { UserProfileEntity } from "../entities/user_profile.entity";

export class UserProviderRepository extends RepositoryBase<UserProviderEntity> {
    protected getModel() {
        return UserProviderEntity;
    }

    async getUserUptimes(limit: number) {
        return await this.findAll({
            limit,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: UserEntity,
                    required: true,
                    include: [
                        {
                            model: UserProfileEntity,
                            required: false,
                            attributes: ["thumbnail"]
                        }
                    ]
                },
            ]
        })
    }

}