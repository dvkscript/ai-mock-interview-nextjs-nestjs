import { BelongsToMany, Column, DataType, HasMany, Model, Table, AssociationActionOptions } from "sequelize-typescript";
import { PermissionEntity } from "./permission.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UserRoleEntity } from "src/modules/users/entities/user_role.entity";
import { RolePermissionEntity } from "./role_permission.entity";
import { BelongsToManySetAssociationsMixin } from "sequelize";

@Table({
    tableName: 'roles',
})
export class RoleEntity extends Model<RoleEntity> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: 'created_at',
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: 'updated_at',
    })
    updatedAt: Date;

    @BelongsToMany(() => UserEntity, () => UserRoleEntity)
    users: UserEntity[];

    @BelongsToMany(() => PermissionEntity, () => RolePermissionEntity)
    permissions: PermissionEntity[];

    public setPermissions!: BelongsToManySetAssociationsMixin<PermissionEntity, string>;
}