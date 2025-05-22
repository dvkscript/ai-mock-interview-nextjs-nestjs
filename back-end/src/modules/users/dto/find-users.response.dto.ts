import { UserEntity } from "../entities/user.entity";

export class FindUserResponseDto {
    id: number;
    fullName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    thumbnail?: string;
    roles: string[];

    constructor(data: UserEntity) {

    }
}