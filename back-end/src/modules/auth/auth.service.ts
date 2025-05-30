import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProfileOAuthDto } from './dto/profile-Oauth.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../shared/config/config.service';
import { BlacklistRepository } from './repositories/blacklist.repository';
import { BLACKLIST_REPOSITORY } from './auth.di-tokens';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    @Inject(BLACKLIST_REPOSITORY)
    private readonly blacklistRepo: BlacklistRepository,
  ) { }

  async validateOAuthLogin(profile: ProfileOAuthDto) {
    try {
      const { email, provider, fullName, picture } = profile;

      const [user] = await this.userService.createUser({
        email,
        fullName,
        thumbnail: picture,
      });

      if (!user) {
        throw new Error("User create failed")
      }

      const tokens = {
        accessToken: this.generateAccessToken(user.id),
        refreshToken: this.generateRefreshToken(),
      }

      const createToken = await this.userService.createToken({
        refreshToken: tokens.refreshToken,
        provider: provider,
        userId: user.id,
      });

      if (!createToken || !createToken.userToken) {
        throw new Error("Token create failed")
      }

      return tokens;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(plainText: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
  }

  generateAccessToken(userId: string) {
    return this.jwtService.sign({ userId });
  }
  generateRefreshToken() {
    const data = Math.random() + new Date().getTime();
    return this.jwtService.sign({ data }, {
      expiresIn: this.configService.jwtConfig.refreshExpires,
      secret: this.configService.jwtConfig.refreshSecret
    });
  }

  async verifyToken(token: string, secret?: string): Promise<{ userId: string, exp: number, iat: number }> {
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: secret || this.configService.jwtConfig.accessSecret
        }
      );
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async refreshToken(refreshToken: string) {
    const res = await this.userService.getRefreshToken(refreshToken);

    if (!res) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      await this.verifyToken(
        res.refreshToken,
        this.configService.jwtConfig.refreshSecret
      );
    } catch (error) {
      await this.userService.deleteRefreshToken(res.refreshToken);
      throw new UnauthorizedException('Invalid token');
    }

    await this.userService.deleteRefreshToken(res.refreshToken);

    const tokens = {
      accessToken: this.generateAccessToken(res.userId),
      refreshToken: this.generateRefreshToken(),
    };

    await this.userService.createUserToken(tokens.refreshToken, res.userId)

    return tokens
  }

  async logout(accessToken: string, expired: Date, refreshToken?: string) {
    const [blacklist, userToken] = await Promise.all([
      this.blacklistRepo.create({
        token: accessToken,
        expired
      }),
      refreshToken ? this.userService.deleteRefreshToken(refreshToken) : null
    ]);
    return { blacklist, userToken };
  }

  async getTokenBlacklist(token: string) {
    return await this.blacklistRepo.findOne({
      token
    })
  }

  async deleteBacklist(token: string) {
    return await this.blacklistRepo.delete({
      token
    })
  }

  getUser(userId: string) {
    return this.userService.getUser(userId);
  }
}
