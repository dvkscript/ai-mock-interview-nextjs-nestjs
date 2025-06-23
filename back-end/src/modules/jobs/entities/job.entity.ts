import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Max, Min, Model, PrimaryKey, Table } from "sequelize-typescript";
import { JobQuestionEntity } from "./job_question.entity";
import { JobStatus } from "src/modules/shared/enum/job-status";
import { JobFeedbackEntity } from "./job_feedback";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Table({
    tableName: 'jobs',
})
export class JobEntity extends Model<JobEntity> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @Min(1)
    @Max(225)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    position: string;

    @Min(3)
    @Max(225)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Min(0)
    @Max(50)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'years_of_experience',
    })
    yearsOfExperience: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
        field: "average_score"
    })
    averageScore: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_public"
    })
    isPublic: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        field: "shared_token"
    })
    sharedToken?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "progress_answer"
    })
    progressAnswer: number;

    @Column({
        type: DataType.ENUM(JobStatus.IN_PROGRESS, JobStatus.COMPLETED, JobStatus.REVIEWED, JobStatus.CANCELLED, JobStatus.NOT_STARTED),
        defaultValue: JobStatus.CREATING,
        allowNull: false,
    })
    status: JobStatus;

    @ForeignKey(() => UserEntity)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id"
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

    @HasMany(() => JobQuestionEntity, { as: 'questions', foreignKey: 'jobId' })
    questions: JobQuestionEntity[];

    @HasOne(() => JobFeedbackEntity, { as: 'feedback', foreignKey: 'jobId' })
    feedback: JobFeedbackEntity;

    @BelongsTo(() => UserEntity)
    user: UserEntity;
}