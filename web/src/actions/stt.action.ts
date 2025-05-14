"use server"
import responseAPI from "@/lib/api/response.api";
import gatewayApi from "@/lib/axios/gateway";

export const speechToText = responseAPI.catchError(
    async (audio: File) => {
        const formData = new FormData();
        formData.append('audio', audio);

        const res = await gatewayApi.post("/speech-to-text", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        if (!res.data) {
            throw new Error("Something went wrong")
        }
        return responseAPI.success({
            data: res.data
        })
    }
)
