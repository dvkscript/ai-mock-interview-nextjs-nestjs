import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { JobEntity } from "./job.entity";
import { QuestionType } from "src/modules/shared/enum/question-type";
import { JobQuestionAnswerEntity } from "./job_question_answer";

@Table({
    tableName: 'job_questions',
})
export class JobQuestionEntity extends Model<JobQuestionEntity> {
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
    question: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: QuestionType;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    note?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    required: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    index: number;

    @Column({
        type: DataType.UUID,
        allowNull: true,
        field: "audio_id"
    })
    audioId: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: "audio_url"
    })
    audioUrl: string;

    @ForeignKey(() => JobEntity)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "job_id"
    })
    jobId: string;

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

    @BelongsTo(() => JobEntity, { as: 'job', foreignKey: 'jobId' })
    job: JobEntity;

    @HasOne(() => JobQuestionAnswerEntity, { as: 'answer', foreignKey: 'jobQuestionId' })
    answer: JobQuestionAnswerEntity;
}