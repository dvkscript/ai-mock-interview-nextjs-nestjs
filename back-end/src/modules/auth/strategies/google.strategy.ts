import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from 'src/modules/shared/config/config.service';
import { Request } from 'express';
import { ProfileOAuthDto } from '../dto/profile-Oauth.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.systemConfig.googleClientId,
      clientSecret: configService.systemConfig.googleClientSecret,
      callbackURL: `${configService.systemConfig.defaultApi}/api/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    
    const { displayName, emails, provider } = profile;
    const user: ProfileOAuthDto = {
      email: emails[0].value,
      picture: profile?._json?.picture,
      fullName: displayName,
      provider,
      accessToken,
    };
    done(null, user);
  }
} 