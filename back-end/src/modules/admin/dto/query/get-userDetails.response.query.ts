import { RoleEntity } from "src/modules/users/entities/role.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UserProfileEntity } from "src/modules/users/entities/user_profile.entity";

export class GetUserDetailsQuery {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    roles: RoleEntity[];
    profile: UserProfileEntity;

    constructor(data: UserEntity) {
        this.id = data.id;
        this.fullName = data.fullName;
        this.email = data.email;
        this.password = data.password;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.roles = data.roles;
        this.profile = data.profile;
    }
}