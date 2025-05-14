import { QuestionType } from "src/modules/shared/enum/question-type";
import { JobEntity } from "../../entities/job.entity";
import { JobQuestionEntity } from "../../entities/job_question.entity";
import { JobQuestionAnswerEntity } from "../../entities/job_question_answer";
import { JobStatus } from "src/modules/shared/enum/job-status";

class Answer {
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

class Question {
    id: string;
    type: QuestionType;
    question: string;
    note?: string | null;
    required: boolean;
    audioUrl: string;
    index: number;
    createdAt: Date;
    updatedAt: Date;
    answer: Answer;

    constructor(data: JobQuestionEntity) {
        this.id = data.id;
        this.type = data.type;
        this.question = data.question;
        this.note = data.note;
        this.required = data.required;
        this.audioUrl = data.audioUrl;
        this.index = data.index;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.answer = data.answer;
    }
}

export class FindJobQuestionResponse {
    id: string;
    position: string;
    description: string;
    isPublic: boolean;
    status: JobStatus;
    progressAnswer: number;
    questions: Question[]
    createdAt: Date;
    updatedAt: Date;

    constructor(data: JobEntity) {
        this.id = data.id;
        this.position = data.position;
        this.description = data.description;
        this.isPublic = data.isPublic;
        this.status = data.status;
        this.progressAnswer = data.progressAnswer;
        this.questions = data.questions.map(q => new Question(q));
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}