import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions {
    const request = context.switchToHttp().getRequest<Request>();
    const redirectUrl = decodeURIComponent((request.query.redirectUrl || "").toString()) ;
    
    const state = Buffer.from(JSON.stringify({ redirectUrl })).toString('base64');

    return {
      scope: ['email', 'profile'],
      state
    };
  }
}
