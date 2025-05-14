import { Type } from "class-transformer";
import { IsArray, IsEnum, IsString, ValidateNested } from "class-validator";

class Part {
    @IsString()
    text: string;
}

export class GenerateTextContentDto {
    @IsEnum(["user", "model"])
    role: "user" | "model";

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Part)
    parts: Part[];
}