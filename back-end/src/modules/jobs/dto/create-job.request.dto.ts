import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateJobRequestDto {
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
}