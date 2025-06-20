import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserEntity } from "./user.entity";

@Table({
    tableName: 'user_profiles',
})
export class UserProfileEntity extends Model<UserProfileEntity> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    thumbnail: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'thumbnail_id',
    })
    thumbnailId: string;

    @ForeignKey(() => UserEntity)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'user_id',
    })
    userId: string;

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
}