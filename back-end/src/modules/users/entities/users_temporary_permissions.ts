import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { UserEntity } from "./user.entity";
import { PermissionEntity } from "src/modules/users/entities/permission.entity";

@Table({
    tableName: 'users_temporary_permissions',
})
export class UserTemporaryPermissionEntity extends Model<UserTemporaryPermissionEntity> {
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
        field: 'start_time',
    })
    startTime: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'end_time',
    })
    endTime: Date;

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

    @BelongsTo(() => UserEntity)
    user: UserEntity;

    @BelongsTo(() => PermissionEntity)
    permission: PermissionEntity;
}