"use server"
import responseAPI from "@/lib/api/response.api";
import { Permission, Role } from "@/lib/api/Types/user";
import defaultApi from "@/lib/axios/default";
import { TCreateRole } from "@/lib/validators/create-role.validator";
import { revalidatePath } from "next/cache";

export const createRole = responseAPI.catchError(
    async (body: TCreateRole) => {
        const res = await defaultApi.post("/admin/role", body);
        if (res.data) {
            revalidatePath("/")
        }
        return responseAPI.success<{ id: string }>(res.data);
    }
)

export type GetRoleAndCountAll = {
    count: number;
    rows: {
        id: string;
        name: string;
        userCount: number;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

export const getRoleAndCountAll = responseAPI.catchError(
    async (params: Record<string, string>) => {
        const res = await defaultApi.get("/admin/roles", {
            params
        })

        return responseAPI.success<GetRoleAndCountAll | null>({
            data: res.data
        });
    }
)

export const deleteRole = responseAPI.catchError(
    async (id: string[]) => {
        const res = await defaultApi.delete("/admin/role", {
            data: {
                id
            }
        })

        if (res.data) {
            revalidatePath("/")
        }

        return responseAPI.success<{ id: string }>({
            data: res.data
        });
    }
)

export type GetRole = Omit<Role, "users" | "permissions"> & {
    permissions: Permission[]
}

export const getRole = responseAPI.catchError(
    async (roleId: string) => {
        const res = await defaultApi.get(`/admin/role/${roleId}`);

        return responseAPI.success<GetRole | null>({
            data: res.data
        })
    }
)

export const updateRole = responseAPI.catchError(
    async (roleId: string, body: TCreateRole) => {
        const res = await defaultApi.put(`/admin/role/${roleId}`, body);
        if (res.data) {
            revalidatePath("/")
        }
        return responseAPI.success<{ id: string }>(res.data);
    }
)