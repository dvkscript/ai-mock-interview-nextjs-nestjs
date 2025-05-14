import { JobStatus } from "src/modules/shared/enum/job-status";
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class UpdateJobInputDto {
    @IsNumber()
    @Min(1)
    @IsOptional()
    progressAnswer?: number;

    @IsEnum(JobStatus)
    @IsOptional()
    status?: JobStatus;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(225)
    position?: string;

    @IsOptional()
    @IsString()
    @MinLength(0)
    @MaxLength(225)
    description?: string;
}