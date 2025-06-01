"use server"
import responseAPI from "@/lib/api/response.api";
import defaultApi from "@/lib/axios/default";

export const getUsers = responseAPI.catchError(
    async (params: Record<string, string>) => {
        const res = await defaultApi.get("/user/users", {
            params
        })

        return responseAPI.success(res);
    }
)