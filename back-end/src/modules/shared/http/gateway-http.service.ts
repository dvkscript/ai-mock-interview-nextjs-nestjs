import { HttpException, Inject, Injectable } from "@nestjs/common";
import { GATEWAY_HTTP } from "./http.di-tokens";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { TextGenerationResponse } from "./entities/text-generation.response";
import * as FormData from 'form-data';
import { GenerateTextContentDto } from "./dto/generateTextContent.dto";

@Injectable()
export class GatewayHttpService {
    constructor(
        @Inject(GATEWAY_HTTP)
        private readonly client: HttpService
    ) { }

    async generateText(prompt: string, model: string = 'local', contents?: GenerateTextContentDto[]): Promise<TextGenerationResponse | null> {
        const response = await firstValueFrom(this.client.post("/text-generation", {
            prompt,
            model,
            defaultPrompts: contents || []
        }));

        if (!response.data) {
            return null;
        }
        return response.data.data;
    }

    async convertTextToSpeech(text: string): Promise<Pick<Express.Multer.File, "buffer" | "filename" | "mimetype" | "size">> {
        const response = await firstValueFrom(this.client.post("/text-to-speech", {
            text
        }, {
            responseType: 'arraybuffer'
        }));
        const data = response.data

        if (!data) {
            throw new HttpException("Convert text to speech failed", response.status, {
                description: response.data?.message
            })
        }

        const disposition = response.headers['content-disposition'];
        const filename = (() => {
            const match = disposition?.match(/filename="?([^"]+)"?/);
            return match?.[1] || 'tts-output.wav';
        })();

        return {
            buffer: Buffer.from(data),
            filename,
            mimetype: response.headers['content-type'],
            size: parseInt(response.headers['content-length'], 10),
        };
    }

    async uploadFile(userId: string, file: Pick<Express.Multer.File, "buffer" | "filename" | "mimetype" | "size">): Promise<{id: string, url: string}> {
        const form = new FormData();
        const headers = form.getHeaders();

        form.append('file', file.buffer, {
            filename: file.filename,
            contentType: file.mimetype,
            knownLength: file.size,
        });

        form.append('userId', userId);

        const res = await firstValueFrom(this.client.post("/upload", form, {
            headers,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        }));

        if (!res.data) {
            throw new HttpException("Upload file failed", res.status, {
                description: res.data?.message
            })
        }
        return res.data.data
    }

    async deleteFile(fileIds: string[]): Promise<any> {
        const res = await firstValueFrom(this.client.delete("/file", {
            data: {
                fileIds
            }
        }));
        if (!res.data) {
            return null
        }
        return res.data.data
    }
}