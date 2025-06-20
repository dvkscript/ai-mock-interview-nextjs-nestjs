import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateProfile {
    @IsString()
    @IsOptional()
    // @IsUrl()
    thumbnail?: string;

    @IsString()
    @IsOptional()
    thumbnailId?: string;

    @IsString()
    @MaxLength(100)
    @IsOptional()
    fullName?: string;
}
