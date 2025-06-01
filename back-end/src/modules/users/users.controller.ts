import { Controller, Get, NotFoundException, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FindProfileResponseDto } from './dto/find-profile.response.dto';
import { UsersRolesParamsDto } from './dto/users-roles-params';

@ApiTags('user')
@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

}
