import { Controller, Post, UseGuards, Request, Get, Req, Res, Query, BadRequestException, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthResponseDto, ProfileResponseDto, QueryAuthResponseDto } from './dto/auth.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { isURL } from 'class-validator';
import envConfig from 'src/configs/env.config';
import { ProfileOAuthDto } from './dto/profile-Oauth.dto';
import { AuthGuard } from './auth.guard';
import { RefreshTokenInputDto } from './dto/refresh-token.input.dto';
import { PermissionsGuard } from '../users/guards/permissions.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Bắt đầu quá trình đăng nhập bằng Google' })
  @ApiResponse({ status: 302, description: 'Chuyển hướng đến trang đăng nhập Google' })
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() { }

  @ApiOperation({ summary: 'Callback URL cho Google OAuth' })
  @ApiResponse({
    status: 302,
    description: 'Chuyển hướng đến trang Client với query data',
    type: QueryAuthResponseDto
  })
  @ApiResponse({
    status: 500,
    description: 'Invalid Server Error',
  })
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req, @Query("state") state: string, @Res() res) {
    const data = JSON.parse(Buffer.from(state as string, 'base64').toString('utf-8'));
    const redirectUrl = data.redirectUrl;

    if (!isURL(redirectUrl, {
      require_tld: envConfig.system.nodeEnv !== "development"
    })) {
      throw new BadRequestException('redirectUrl không hợp lệ');
    }

    const user: ProfileOAuthDto = req.user;

    const url = new URL(redirectUrl);

    try {
      const tokens = await this.authService.validateOAuthLogin(user);

      url.searchParams.set('accessToken', tokens.accessToken);
      url.searchParams.set('refreshToken', tokens.refreshToken);

      res.redirect(url);
    } catch (error) {
      url.searchParams.set('message', error.message);
      res.redirect(url);
    }
  }

  @ApiOperation({ summary: 'Bắt đầu quá trình đăng nhập bằng GitHub' })
  @ApiResponse({ status: 302, description: 'Chuyển hướng đến trang đăng nhập GitHub' })
  @Get('github')
  @UseGuards(GithubAuthGuard)
  async githubAuth() { }

  @ApiOperation({ summary: 'Callback URL cho GitHub OAuth' })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập GitHub thành công',
    type: AuthResponseDto
  })
  @ApiResponse({ status: 401, description: 'Đăng nhập GitHub thất bại' })
  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubAuthCallback(@Req() req, @Query("state") state: string, @Res() res) {
    const data = JSON.parse(Buffer.from(state as string, 'base64').toString('utf-8'));
    const redirectUrl = data.redirectUrl;

    if (!isURL(redirectUrl, {
      require_tld: envConfig.system.nodeEnv !== "development"
    })) {
      throw new BadRequestException('redirectUrl không hợp lệ');
    }

    const user: ProfileOAuthDto = req.user;

    const url = new URL(redirectUrl);

    try {
      const tokens = await this.authService.validateOAuthLogin(user);

      url.searchParams.set('accessToken', tokens.accessToken);
      url.searchParams.set('refreshToken', tokens.refreshToken);

      res.redirect(url);
    } catch (error) {
      url.searchParams.set('message', error.message);
      res.redirect(url);
    }
  }
  
  @ApiOperation({ summary: 'sử lý khi accessToken hết hạn' })
  @ApiBody({
    type: RefreshTokenInputDto
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy token thành công',
    type: AuthResponseDto
  })
  @ApiResponse({ status: 401, description: 'Token hết hạn' })
  @Post("refresh-token")
  refreshToken(@Body() body: RefreshTokenInputDto) {
    return this.authService.refreshToken(body.refreshToken)
  }

  @ApiOperation({ summary: 'Lấy thông tin profile của người dùng' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin profile thành công',
    type: ProfileResponseDto
  })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('profile')
  getProfile(@Request() req): ProfileResponseDto {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  async logout(@Req() req, @Body() body: { resfreshToken?: string }) {
    const user = req.user;
    
    if (!user) {
      throw new UnauthorizedException();
    }
    await this.authService.logout(user.token, user.exp, body.resfreshToken);
    req.user = null;
    return {};
  }
}
