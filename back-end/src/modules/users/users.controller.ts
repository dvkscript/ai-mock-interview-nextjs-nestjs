import { Body, Controller, Get, NotFoundException, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateProfile } from './dto/input/update-user.input';
import { Request } from 'express';

@ApiTags('user')
@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'Update user profile successfully',
  })
  @Patch("profile")
  async updateProfile(
    @Body() body: UpdateProfile,
    @Req() req: Request
  ) {
    const user = req.user!;

    const res = await this.usersService.updateProfile(user.id, body);

    return res;
  }
}
