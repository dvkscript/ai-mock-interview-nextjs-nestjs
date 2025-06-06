import { PermissionEntity } from "src/modules/users/entities/permission.entity";
import { RoleEntity } from "src/modules/users/entities/role.entity";

export class GetRoleResponseQuery {
  id: string;
  name: string;
  permissions: PermissionEntity[] = [];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: RoleEntity) {
    this.id = data.id;
    this.name = data.name;
    this.permissions = data.permissions;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt
  }
}