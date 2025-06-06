import { AdminRole, UserRole } from "@/enums/role";

export type Role = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Permission = {
    id: string;
    value: UserRole | AdminRole;
    createdAt: Date;
    updatedAt: Date;
}

export type UserProvider = {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type User = {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}
