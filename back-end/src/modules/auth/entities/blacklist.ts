import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'blacklists',
})
export class BlacklistEntity extends Model<BlacklistEntity> {
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
    token: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    expired: Date;

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