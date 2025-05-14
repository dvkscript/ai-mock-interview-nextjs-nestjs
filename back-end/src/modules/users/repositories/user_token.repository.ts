import { RepositoryBase } from "src/libs/db/repository.base";
import { UserTokenEntity } from "../entities/user_tokens.entity";

export class UserTokenRepository extends RepositoryBase<UserTokenEntity> {
    protected getModel() {
        return UserTokenEntity;
    }
}