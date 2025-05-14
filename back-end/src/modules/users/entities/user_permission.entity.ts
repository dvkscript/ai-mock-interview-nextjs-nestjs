import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserEntity } from "./user.entity";
import { PermissionEntity } from "./permission.entity";

@Table({
    tableName: 'users_permissions',
})
export class UserPermissionEntity extends Model<UserPermissionEntity> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: string;

    @ForeignKey(() => UserEntity)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
        onDelete: 'CASCADE',  
        onUpdate: "CASCADE"
    })
    userId: string;

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