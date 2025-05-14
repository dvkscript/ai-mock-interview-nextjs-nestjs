import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log(token,1111111);
        
        if (!token) {
            throw new UnauthorizedException();
        }

        const tokenBlacklist = await this.authService.getTokenBlacklist(token);

        if (tokenBlacklist) {
            const tokenExp = tokenBlacklist.expired;
            const currentDate = new Date();

            if (tokenExp < currentDate) {
                await this.authService.deleteBacklist(token);
            }
            throw new UnauthorizedException("Token block");
        }

        const { iat, exp, userId } = await this.authService.verifyToken(token);

        const user = {
            iat: iat * 1000,
            exp: exp * 1000,
            id: userId,
            token
        };

        request['user'] = user;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = (request.headers as any).authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}