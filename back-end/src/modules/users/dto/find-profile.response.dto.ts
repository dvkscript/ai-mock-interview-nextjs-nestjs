import { UserEntity } from "../entities/user.entity";

export class FindProfileResponseDto {
    id: string;
    fullName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    thumbnail?: string;
    permissions: string[]

    constructor(user: FindProfileResponseDto) {
        this.id = user.id;
        this.fullName = user.fullName;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.thumbnail = user?.thumbnail;
        this.permissions = user.permissions;
    }
}