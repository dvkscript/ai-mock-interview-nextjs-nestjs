import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserEntity } from "./user.entity";

@Table({
    tableName: 'user_providers',
})
export class UserProviderEntity extends Model<UserProviderEntity>  {
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
    name: string;

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