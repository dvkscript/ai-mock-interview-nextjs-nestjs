import axios from "axios";

export interface ResponseAPI<T> {
    ok: boolean;
    status: number;
    message: string;
    data: T;
    errors: null | Record<string, string> | string;
};

type CatchErrorValues = {
    status: ResponseAPI<null>['status'];
    message: ResponseAPI<null>['message'];
    errors?: ResponseAPI<null>['errors'];
}

class CatchError extends Error {
    status: CatchErrorValues['status'];
    errors: CatchErrorValues['errors'];

    constructor({ status, message, errors }: CatchErrorValues) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}

type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;


const responseAPI = {
    success: <T>({
        status = 200,
        message = "Success",
        data,
    }: PartialExcept<Omit<ResponseAPI<T>, "ok" | "errors">, "data">): ResponseAPI<T> => {
        return {
            ok: true,
            status,
            message,
            data,
            errors: null,
        }
    },
    error: ({
        status = 502,
        message = "Error",
        errors = null
    }: Partial<CatchErrorValues>): ResponseAPI<null> => {
        return {
            ok: false,
            status,
            message: message === "fetch failed" ? "The server is not responding" : message,
            data: null,
            errors,
        }
    },
    CatchError,
    catchError: function <T, A extends any[]>(promise: (...args: A) => Promise<ResponseAPI<T>>) {
        return async (...args: A): Promise<ResponseAPI<T | null>> => {
            try {
                return await promise(...args);
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    return this.error({
                        ...error.response?.data,
                        status: error.response?.data?.code
                    })
                }
                return this.error(error);
            }
        }
    }
}

export default responseAPI;