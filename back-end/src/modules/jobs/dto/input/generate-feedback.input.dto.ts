import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { QuestionType } from "src/modules/shared/enum/question-type";

export class Question {
    @IsString()
    question: string;

    @IsString()
    answer: string;

    @IsBoolean()
    required: boolean;
}

export class GenerateFeedbackInputDto {
    @IsString()
    position: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    @Max(50)
    yearsOfExperience: number;

    @IsString()
    @IsOptional()
    model?: string;

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => Question)
    questions: {
        [key in QuestionType]?: Question[]
    };
}