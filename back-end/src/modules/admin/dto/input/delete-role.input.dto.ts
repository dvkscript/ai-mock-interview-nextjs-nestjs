import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";

export class DeleteRoleInput {
    @IsArray()
    @Type(() => String)
    @IsString({ each: true })
    id: string[];
}