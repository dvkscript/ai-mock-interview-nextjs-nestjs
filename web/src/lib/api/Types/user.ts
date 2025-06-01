import { AdminRole, UserRole } from "@/enums/role";

export type Role = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    users?: User[];
    permissions?: Permission[];
}

export type Permission = {
    id: string;
    value: UserRole | AdminRole;
    createdAt: Date;
    updatedAt: Date;
    roles?: Role[];
    users?: User[];
}

export type User = {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    roles?: Role[];
    permissions?: Permission[];
}
