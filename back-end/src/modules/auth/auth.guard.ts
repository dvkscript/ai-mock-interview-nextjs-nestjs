import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { ROLES_DECORATOR } from "./auth.di-tokens";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        const token = this.extractTokenFromHeader(request);

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

        const user = await this.authService.getUserProfile(userId);

        if (!user) {
            throw new UnauthorizedException();
        }

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_DECORATOR,
            [context.getHandler(), context.getClass()]
        );

        if (requiredRoles?.length > 0) {
            const hasRole = requiredRoles.some(role => user.permissions.includes(role));
            
            if (!hasRole) {
              throw new ForbiddenException('You do not have required roles');
            }
        }

        request['user'] = {
            iat: iat * 1000,
            exp: exp * 1000,
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            token,
            roles: user.roles,
            permissions: user.permissions,
            thumbnail: user.thumbnail
        };
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = (request.headers as any).authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}