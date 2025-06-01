import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '../shared/config/config.service';
import { AuthGuard } from './auth.guard';
import { BLACKLIST_REPOSITORY } from './auth.di-tokens';
import { BlacklistRepository } from './repositories/blacklist.repository';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule,
    SharedModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.jwtConfig.accessSecret, // lấy từ biến môi trường
        signOptions: {
          expiresIn: configService.jwtConfig.accessExpires,
        },
      }),
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // JwtStrategy,
    GoogleStrategy,
    GithubStrategy,
    {
      provide: BLACKLIST_REPOSITORY,
      useClass: BlacklistRepository
    },
    AuthGuard,
    RolesGuard,
  ],
  exports: [AuthService, AuthGuard, RolesGuard],
})
export class AuthModule { }
