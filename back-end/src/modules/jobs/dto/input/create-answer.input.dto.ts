import { IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateAnswerInputDto {
    @IsUUID()
    questionId: string;

    @IsString()
    @MinLength(1)
    @MaxLength(5000)
    answer: string;
}