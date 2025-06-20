import { RepositoryBase } from "src/libs/db/repository.base";
import { UserProfileEntity } from "../entities/user_profile.entity";

export class UserProfileRepository extends RepositoryBase<UserProfileEntity> {
    protected getModel() {
        return UserProfileEntity;
    }

    async getProfileByUserId(userId: string) {
        return await this.findOne({
            userId
        })
    }
}