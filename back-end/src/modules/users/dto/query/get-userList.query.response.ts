import { RoleEntity } from "../../entities/role.entity";
import { UserEntity } from "../../entities/user.entity";
import { UserProviderEntity } from "../../entities/user_provider.entity";

export class GetUserListQueryReponse {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    thumbnail: string;
    roles: RoleEntity[];
    provider?: UserProviderEntity;

    constructor(data: UserEntity) {
        this.id = data.id;
        this.fullName = data.fullName;
        this.email = data.email;
        this.password = data.password;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.thumbnail = data.profile?.thumbnail;
        this.roles = data.roles;
        this.provider = data.providers[0]
    }
}