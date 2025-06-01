//src/libs/types/express.d.ts
import 'express';

declare module 'express' {
    export interface Request {
        user: {
            iat: number;
            exp: number;
            id: string;
            email: string;
            fullName: string;
            token: string;
            roles: string[];
            permissions: string[];
            thumbnail?: string;
        } | null;
    }
}