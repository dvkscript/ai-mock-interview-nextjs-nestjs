import { UserProvider } from "src/modules/users/user.enum";

export class ProfileOAuthDto {
    email: string;
    picture: string;
    fullName: string;
    provider: UserProvider;
    accessToken: string;
}