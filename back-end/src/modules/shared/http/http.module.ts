import { HttpModule as HttpModuleDefault } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { GatewayHttpProvider } from "./http.providers";
import { ConfigService } from "../config/config.service";
import { GATEWAY_HTTP } from "./http.di-tokens";
import { GatewayHttpService } from "./gateway-http.service";

@Module({
    imports: [
        HttpModuleDefault.register({
            timeout: 1000000,
            maxRedirects: 5,
        })
    ],
    providers: [GatewayHttpProvider, GatewayHttpService, ConfigService],
    exports: [GatewayHttpService]
})
export class HttpModule { }