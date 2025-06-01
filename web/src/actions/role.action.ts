"use server"
import responseAPI from "@/lib/api/response.api";
import defaultApi from "@/lib/axios/default";
import { TCreateRole } from "@/lib/validators/create-role.validator";

export const createRole = responseAPI.catchError(
    async (body: TCreateRole) => {
        const res = await defaultApi.post("/admin/role", body);
        return responseAPI.success<{ id: string }>(res.data);
    }
)

export type GetRoleAndCountAll = {
    count: number;
    rows: {
        id: string;
        name: string;
        userCount: number;
        createdAt: string;
        updatedAt: string;
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
