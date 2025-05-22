"use server"
import responseAPI from "@/lib/api/response.api";
import defaultApi from "@/lib/axios/default";

export interface GetUserProfile {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
    thumbnail?: string;
    permissions: string[]
}

export const getUserProfile = responseAPI.catchError(
    async () => {
        const res = await defaultApi.get<GetUserProfile | null>("/user/profile");

        if (!res) {
            throw new Error("User not found")
        }

        return responseAPI.success(res);
    }
)

export const getUsers = responseAPI.catchError(
    async (params: Record<string, string>) => {
        const res = await defaultApi.get("/user/users", {
            params
        })

        return responseAPI.success(res);
    }
)