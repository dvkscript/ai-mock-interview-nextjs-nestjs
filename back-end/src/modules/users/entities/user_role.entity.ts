import { BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Table({
    tableName: 'users_roles',
})
export class UserRoleEntity extends Model<UserRoleEntity> {
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

    @ForeignKey(() => RoleEntity)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "role_id",
        onDelete: 'CASCADE',  
        onUpdate: "CASCADE"
    })
    roleId: string;

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