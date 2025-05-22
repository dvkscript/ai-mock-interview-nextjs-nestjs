import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserPermissionEntity } from "./user_permission.entity";
import { RolePermissionEntity } from "./role_permission.entity";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";
import { UserTemporaryPermissionEntity } from "./users_temporary_permissions";

@Table({
    tableName: 'permissions',
})
export class PermissionEntity extends Model<PermissionEntity> {
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
    })
    value: string;

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

    @BelongsToMany(() => UserEntity, () => UserPermissionEntity)
    users: UserPermissionEntity[];

    @BelongsToMany(() => RoleEntity, () => RolePermissionEntity)
    roles: RoleEntity[];

    @HasMany(() => UserTemporaryPermissionEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "temporaryUsers"
    })
    temporaryUsers: UserTemporaryPermissionEntity[];
}