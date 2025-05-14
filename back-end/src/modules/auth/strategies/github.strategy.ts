import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from 'src/modules/shared/config/config.service';
import { ProfileOAuthDto } from '../dto/profile-Oauth.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.systemConfig.githubClientId,
      clientSecret: configService.systemConfig.githubClientSecret,
      callbackURL: `${configService.systemConfig.defaultApi}/api/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { photos, emails, displayName, provider } = profile;
    const user: ProfileOAuthDto = {
      email: emails[0].value,
      picture: photos[0].value,
      fullName: displayName,
      provider,
      accessToken,
    };
    return user;
  }
} 