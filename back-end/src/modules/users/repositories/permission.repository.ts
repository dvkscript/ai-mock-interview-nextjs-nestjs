import { PermissionEntity } from "../entities/permission.entity";
import { RepositoryBase } from "src/libs/db/repository.base";

export class PermissionRepository extends RepositoryBase<PermissionEntity> {
    protected getModel() {
        return PermissionEntity;
    }
}