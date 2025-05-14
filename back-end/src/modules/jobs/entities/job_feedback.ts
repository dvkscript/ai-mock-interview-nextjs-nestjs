import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { JobEntity } from "./job.entity";

@Table({
    tableName: 'job_feedbacks',
})
export class JobFeedbackEntity extends Model<JobFeedbackEntity> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @ForeignKey(() => JobEntity)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "job_id"
    })
    jobId: string;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
    })
    content: Record<string, any>;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: DataType.NOW
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "updated_at",
        defaultValue: DataType.NOW
    })
    updatedAt: Date;

    @BelongsTo(() => JobEntity, { as: 'job', foreignKey: 'jobId' })
    job: JobEntity;
}