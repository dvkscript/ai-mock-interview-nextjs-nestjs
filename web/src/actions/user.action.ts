"use server"
import responseAPI from "@/lib/api/response.api";
import { Role, UserProvider } from "@/lib/api/Types/user";
import defaultApi from "@/lib/axios/default";
import { TUpdateProfile } from "@/lib/validators/update-profile";
import { TUpdateUser } from "@/lib/validators/update-user.validator";
import { revalidatePath } from "next/cache";

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

export type GetUserDetail = {
    id: string;
    fullName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    thumbnail?: string;
    roles: Role[];
}

export const getUserDetail = responseAPI.catchError(
    async (userId: string) => {
        const res = await defaultApi.get(`/admin/user/${userId}`);

        return responseAPI.success<GetUserDetail>(res);
    }
)

export const updateUser = responseAPI.catchError(
    async (userId: string, body: TUpdateUser) => {
        const res = await defaultApi.put(`/admin/user/${userId}`, {
            ...body,
            password: body.password || undefined,
            confirmPassword: body.confirmPassword || undefined
        });

        if (res.data) {
            revalidatePath("/")
        }
        return responseAPI.success<{ id: string }>(res);
    }
)

export const updateProfile = responseAPI.catchError(
    async (body: Partial<TUpdateProfile & { thumbnail: string, thumbnailId: string }>) => {
        const res = await defaultApi.patch(`/user/profile`, {
            ...body,
        });

        if (res.data) {
            revalidatePath("/")
        }

        return responseAPI.success(res);
    }
)

export const getUserTest = responseAPI.catchError(async () => {
    const res= await defaultApi.patch("/user/profile");
    return responseAPI.success(res);
})
