import { UserEntity } from "src/modules/users/entities/user.entity";

export class FindUserProfileAuthResponse {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    thumbnail?: string;
    createdAt: Date;
    updatedAt: Date;
    roles: string[];
    permissions: string[];

    constructor(data: UserEntity) {
        this.id = data.id;
        this.fullName = data.fullName;
        this.email = data.email;
        this.thumbnail = data.profile?.thumbnail;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;

        const userTemporaryPermissions = data.temporaryPermissions.map(utp => utp.permission.value);
        const rolePermissions = data.roles.flatMap(r => r.permissions?.map(p => p.value) || []);
        this.roles = data.roles.map(r => r.name);

        const userPermissions = data.permissions.map(p => p.value);
        this.permissions = Array.from(new Set([...userPermissions, ...userTemporaryPermissions, ...rolePermissions]));
        
    }
}