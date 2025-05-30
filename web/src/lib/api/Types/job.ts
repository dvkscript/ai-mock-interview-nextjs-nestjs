export enum JobStatus {
    NOT_STARTED = 'not_started',
    CREATING = 'creating',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    REVIEWED = 'reviewed',
    CANCELLED = 'cancelled',
    CREATE_FAILED = 'create_failed',
}

export enum QuestionType {
    TECHNICAL = 'technical',
    SITUATION = 'situation',
    MINDSET = 'mindset',
    CULTURAL = 'cultural',
    CONVERSATIONAL = 'conversational',
}

export interface JobQuestionAnswer {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface JobQuestion {
    id: string;
    type: QuestionType;
    question: string;
    required: boolean;
    note?: string;
    index: number;
    audioUrl: string;
    answer: JobQuestionAnswer;
    createdAt: Date;
    updatedAt: Date;
}


export interface Job {
    id: string;
    position: string;
    description: string;
    yearsOfExperience: number;
    isPublic: boolean;
    status: JobStatus;
    sharedToken?: string;
    progressAnswer: number;
    averageScore: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface JobWithQuestion extends Job {
    questions: JobQuestion[];
}
