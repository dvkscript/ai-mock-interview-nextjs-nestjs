"use server"

import responseAPI from "@/lib/api/response.api"
import gatewayApi from "@/lib/axios/gateway"

export const uploadFile = responseAPI.catchError(
    async (formData: FormData) => {
        const res = await gatewayApi.post(`/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return responseAPI.success<{
            id: string;
            url: string;
        }>(res);
    }
)

export const deleteFile = responseAPI.catchError(
    async (publicId: string[]) => {
        const res = await gatewayApi.delete(`/file`, {
            data: {
                fileIds: publicId
            }
        });

        return responseAPI.success(res);
    }
)