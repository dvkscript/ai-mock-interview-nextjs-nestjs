import { IsEnum, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum ExperiencePagination {
  ALL = "all",
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE_PLUS = "5+"
}

export enum ScorePagination {
  ALL = "all",
  EXCELLENT = "excellent",
  GOOD = "good",
  AVERAGE = "average",
  POOR = "poor"
}

export class GetJobsPaginationQuery {
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
  @IsEnum(ExperiencePagination)
  experience: ExperiencePagination = ExperiencePagination.ALL;

  @IsOptional()
  @Type(() => String)
  @IsEnum(ScorePagination)
  score: ScorePagination = ScorePagination.ALL;

  @IsOptional()
  @Type(() => String)
  q: string = ""
}
