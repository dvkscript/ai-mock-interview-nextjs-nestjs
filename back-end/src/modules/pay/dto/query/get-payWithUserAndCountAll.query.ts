import { Type } from "class-transformer";
import { IsOptional, IsPositive, Max, Min } from "class-validator";

export class GetPayWithUserAndCountAllQuery {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @Max(20)
    limit: number = 10;

    @IsOptional()
    @Type(() => String)
    q: string = ""
}