import { BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { RoleEntity } from "./role.entity";
import { PermissionEntity } from "./permission.entity";

@Table({
    tableName: 'roles_permissions',
})
export class RolePermissionEntity extends Model<RolePermissionEntity> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: string;

    @ForeignKey(() => RoleEntity)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "role_id",
        onDelete: 'CASCADE',  
        onUpdate: "CASCADE"
    })
    roleId: string;

    @ForeignKey(() => PermissionEntity)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "permission_id",
        onDelete: 'CASCADE',  
        onUpdate: "CASCADE"
    })
    permissionId: string;

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
}