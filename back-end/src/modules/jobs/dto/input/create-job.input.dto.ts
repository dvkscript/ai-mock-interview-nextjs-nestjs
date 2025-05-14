import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Max, Min, ValidateNested } from "class-validator";
import { QuestionType } from "src/modules/shared/enum/question-type";

class Questions {
    @IsString()
    question: string;

    @IsEnum(QuestionType)
    type: QuestionType;

    @IsNumber()
    @Min(1)
    index: number;
    
    @IsBoolean()
    required: boolean;

    @IsString()
    @IsOptional()
    note?: string;

    @IsString()
    @IsOptional()
    suggestedAnswer?: string;
}

export class CreateJobInputDto {
    @IsString()
    position: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    @Max(50)
    yearsOfExperience: number;

    @IsUUID()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Questions)
    questions: Questions[];
}