import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchRoleQueryInput {
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsOptional()
    page: number = 1;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsOptional()
    limit: number = 10;

    @IsString()
    @IsOptional()
    q?: string;
}