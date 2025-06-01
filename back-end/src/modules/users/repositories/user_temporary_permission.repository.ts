import { Op } from "sequelize";
import { UserTemporaryPermissionEntity } from "../entities/users_temporary_permissions";
import { RepositoryBase } from "src/libs/db/repository.base";
import { PermissionEntity } from "src/modules/users/entities/permission.entity";

export class UserTemporaryPermissionRepository extends RepositoryBase<UserTemporaryPermissionEntity> {
    protected getModel() {
        return UserTemporaryPermissionEntity;
    }

    async getValidPermissions(userId: string) {
        return await this.findAll({
            where: {
                userId,
                endTime: { [Op.gt]: new Date() },
            },
            include: {
                model: PermissionEntity
            }
        })
    }
}