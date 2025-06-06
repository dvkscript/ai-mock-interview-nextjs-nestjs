"use server"
import responseAPI from "@/lib/api/response.api";
import { UserProvider } from "@/lib/api/Types/user";
import defaultApi from "@/lib/axios/default";

export type GetUserAndCountAll = {
    count: number;
    rows: {
        id: string,
        email: string,
        fullName: string,
        createdAt: Date,
        updatedAt: Date,
        thumbnail?: string,
        roles: {
            id: string,
            name: string,
            createdAt: Date,
            updatedAt: Date,
        }[];
        provider?: Omit<UserProvider, "userId">
    }[]
}
export const getUserAndCountAll = responseAPI.catchError(
    async (params: Record<string, string>) => {
        const res = await defaultApi.get("/admin/users", {
            params
        })

        return responseAPI.success<GetUserAndCountAll>(res);
    }
)