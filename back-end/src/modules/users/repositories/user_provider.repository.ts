import { RepositoryBase } from "src/libs/db/repository.base";
import { UserProviderEntity } from "../entities/user_provider.entity";

export class UserProviderRepository extends RepositoryBase<UserProviderEntity> {
    protected getModel() {
        return UserProviderEntity;
    }
}