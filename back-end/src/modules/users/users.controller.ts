import { Controller, Get, NotFoundException, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FindProfileResponseDto } from './dto/find-profile.response.dto';
import { PermissionsGuard } from './guards/permissions.guard';
import { UsersRolesParamsDto } from './dto/users-roles-params';

@ApiTags('user')
@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Lấy thông tin profile người dùng' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin profile người dùng' })
  @UseGuards(PermissionsGuard)
  @Get("profile")
  async getProfile(@Req() req) {
    const user = req.user as any;

    const res = await this.usersService.getProfile(user.id);

    if (!res) {
      throw new NotFoundException("User not found")
    }

    return new FindProfileResponseDto({
      id: res.id,
      email: res.email,
      fullName: res.fullName,
      thumbnail: res.profile?.thumbnail,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      permissions: user.permissions as string[]
    });
  }
}
