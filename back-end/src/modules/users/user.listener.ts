import { Injectable } from "@nestjs/common";
import { GatewayHttpService } from "../shared/http/gateway-http.service";
import { OnEvent } from "@nestjs/event-emitter";

export const FILE_DELETE = 'file.delete';

@Injectable()
export class UserListener {
    constructor(
        private readonly gatewayHttpService: GatewayHttpService,
    ) { }

    @OnEvent(FILE_DELETE)
    async handleFileDelete(publicId: string) {
        await this.gatewayHttpService.deleteFile([publicId]);
     }
}
