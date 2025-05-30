import { IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateJobListenerDto {
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

    @IsUUID()
    id: string;

    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    model?: string;
}