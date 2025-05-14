import { IsEnum, IsString, IsUUID } from "class-validator";
import { UserProvider } from "../user.enum";

export class CreateUserTokenDto {
    @IsString()
    refreshToken: string;

    @IsEnum(UserProvider)
    provider: UserProvider;

    @IsUUID()
    userId: string;
}
