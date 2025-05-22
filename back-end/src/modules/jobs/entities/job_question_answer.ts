import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { JobQuestionEntity } from "./job_question.entity";

@Table({
    tableName: 'job_question_answers',
})
export class JobQuestionAnswerEntity extends Model<JobQuestionAnswerEntity> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @ForeignKey(() => JobQuestionEntity)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "job_question_id"
    })
    jobQuestionId: string;

    @Column({
        type: DataType.STRING(5000),
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "created_at"
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "updated_at"
    })
    updatedAt: Date;

    @BelongsTo(() => JobQuestionEntity, { as: 'question', foreignKey: 'jobQuestionId' })
    question: JobQuestionEntity;
}