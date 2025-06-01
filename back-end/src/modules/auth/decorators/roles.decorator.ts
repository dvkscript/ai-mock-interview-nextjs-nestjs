import { SetMetadata } from '@nestjs/common';
import { ROLES_DECORATOR } from '../auth.di-tokens';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_DECORATOR, roles);