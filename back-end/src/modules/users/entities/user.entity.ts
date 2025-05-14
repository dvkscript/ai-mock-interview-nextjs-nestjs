import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { UserRoleEntity } from "./user_role.entity";
import { RoleEntity } from "./role.entity";
import { PermissionEntity } from "./permission.entity";
import { UserPermissionEntity } from "./user_permission.entity";
import { UserTokenEntity } from "./user_tokens.entity";
import { UserProviderEntity } from "./user_provider.entity";
import { UserProfileEntity } from "./user_profile.entity";

@Table({
    tableName: 'users',
})
export class UserEntity extends Model<UserEntity> {
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
        field: "full_name"
    })
    fullName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

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

    @BelongsToMany(() => RoleEntity, () => UserRoleEntity)
    roles: RoleEntity[];

    @BelongsToMany(() => PermissionEntity, () => UserPermissionEntity)
    permissions: PermissionEntity[];

    @HasMany(() => UserTokenEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "tokens"
    })
    tokens: UserTokenEntity[];

    @HasMany(() => UserProviderEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "providers"
    })
    providers: UserProviderEntity[];

    @HasOne(() => UserProfileEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "profile"
    })
    profile: UserProfileEntity;
}
