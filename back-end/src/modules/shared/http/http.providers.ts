import { Provider } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from "../config/config.service";
import { HttpService } from "@nestjs/axios";
import { GATEWAY_HTTP } from "./http.di-tokens";

export const GatewayHttpProvider: Provider = {
    provide: GATEWAY_HTTP,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const instance = axios.create({
            baseURL: configService.systemConfig.gatewayApi,
        });
        instance.interceptors.response.use(
            (response) => Promise.resolve(response),
            (error) => {
                const errors = {
                    ...error.response?.data,
                    status: error.response?.data?.code
                }
                return Promise.reject(error.response?.data ? errors : error)
            },
          );
        return new HttpService(instance);
    },
};

