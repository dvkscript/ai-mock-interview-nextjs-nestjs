import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Table({
    tableName: 'pays',
})
export class PayEntity extends Model<PayEntity> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    amount: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "amount_received"
    })
    amountReceived: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    currency: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "payment_method",
    })
    paymentMethod: string;

    @Column({
        type: DataType.JSON,
        allowNull: false,
        field: "payment_method_types"
    })
    paymentMethodTypes: string[];

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "latest_charge"
    })
    latestCharge: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "receipt_email"
    })
    receiptEmail: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description?: string;

    @ForeignKey(() => UserEntity)
    @Column({
        field: "user_id",
        type: DataType.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
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