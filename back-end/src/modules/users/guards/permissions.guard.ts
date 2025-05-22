import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../users.service";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const request = context.switchToHttp().getRequest();
    
    if (!request.user) return false;

    const permissions = await this.userService.getValidPermissions(request.user.id);

    request.user = {
        ...request.user,
        permissions
    };

    // Kiểm tra permission từ user
    return true;
  }
}