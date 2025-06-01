"use server"

import envConfig from "@/configs/env.config";
import { AuthProvider } from "@/enums/provider";
import responseAPI from "@/lib/api/response.api";
import defaultApi from "@/lib/axios/default";
import { deleteCookie } from "@/lib/utils/cookie";

export const loginSocial = async (provider: AuthProvider) => {
    return `${envConfig.defaultApi}/auth/${provider}?redirectUrl=${envConfig.currentUrl}/auth/${provider}/callback`;
}

export const getRefreshToken = responseAPI.catchError(
    async (refreshToken: string) => {
        const res = await defaultApi.post("/auth/refresh-token", {
            refreshToken
        });

        if (!res.data) {
            throw new Error("Invalid Server Error")
        }

        return responseAPI.success({
            data: res.data
        });
    }
)

export type GetProfile = {
    iat: number,
    exp: number,
    id: string,
    email: string,
    fullName: string,
    thumbnail?: string;
    token: string,
    permissions: string[],
    roles: string[];
}

export const getProfile = responseAPI.catchError(
    async () => {
        const res = await defaultApi.get<GetProfile | null>("/auth/profile");

        return responseAPI.success({
            data: res.data
        });
    }
)

export const logout = responseAPI.catchError(
    async () => {
        const res = await defaultApi.post("/auth/logout");
        if (!res.data) {
            throw new Error(res.status.toString());
        }
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
        return responseAPI.success({
            data: null
        })
    }
)