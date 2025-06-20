"use server"

import responseAPI from "@/lib/api/response.api"
import defaultApi from "@/lib/axios/default";

export const getAdminAnalysis = responseAPI.catchError(
    async () => {
        const res = await defaultApi.get("/admin/analysis");
        return responseAPI.success(res)
    }
)