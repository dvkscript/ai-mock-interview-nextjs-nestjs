import { RepositoryBase } from "src/libs/db/repository.base";
import { BlacklistEntity } from "../entities/blacklist";

export class BlacklistRepository extends RepositoryBase<BlacklistEntity> {
    protected getModel() {
        return BlacklistEntity;
    }
}