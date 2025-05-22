"use server"

import responseAPI from "@/lib/api/response.api"
import { Pay } from "@/lib/api/Types/pay";
import defaultApi from '@/lib/axios/default';
import { PaymentMethod } from "@stripe/stripe-js";

export type PayUserPro = Pay

export const payUserPro = responseAPI.catchError(
    async (period: "yearly" | "monthly", paymentMethodId: PaymentMethod["id"]) => {
        const res = await defaultApi.post<PayUserPro | null>("/pay", {
            period,
            paymentMethodId
        });

        return responseAPI.success({
            data: res.data
        })
    }
)

export const getPay = responseAPI.catchError(
    async (id: string) => {
        const res = await defaultApi.get(`/pay/${id}`);
        return responseAPI.success({
            data: res.data
        })
    }
)