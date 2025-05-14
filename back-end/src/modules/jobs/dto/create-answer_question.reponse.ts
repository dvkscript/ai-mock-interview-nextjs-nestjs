import { JobQuestionAnswerEntity } from "../entities/job_question_answer";

export class CreateAnswerQuestionResponseDto {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: JobQuestionAnswerEntity) {
        this.id = data.id;
        this.content = data.content;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}