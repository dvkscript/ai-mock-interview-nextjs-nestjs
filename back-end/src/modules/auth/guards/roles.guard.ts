// roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_DECORATOR } from '../auth.di-tokens';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // private readonly roleService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_DECORATOR,
      [context.getHandler(), context.getClass()]
    );
    
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException('User not found');

    // // ✅ Lấy danh sách các `value` của role user có
    // const userRoles = await this.roleService.getRoleValuesByUserId(user.id); // → ['admin', 'user']

    // const hasRole = requiredRoles.some(role => userRoles.includes(role));

    // if (!hasRole) {
    //   throw new ForbiddenException('You do not have required roles');
    // }

    return true;
  }
}
