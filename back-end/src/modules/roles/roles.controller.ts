import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'get roles all' })
  @ApiResponse({ status: 200, description: 'Get roles success' })
  @Get()
  async getRoles() {
    return await this.rolesService.getRoles();
  }
}
