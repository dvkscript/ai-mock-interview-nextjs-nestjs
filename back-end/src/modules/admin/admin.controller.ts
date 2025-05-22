import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
// import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { PaginationDto } from '../jobs/dto/query/pagination.dto';

@ApiTags('admin')
@UseGuards(AuthGuard)
@Controller('admin')
export class AdminController {
  constructor(
    // private readonly adminService: AdminService
  ) {}

  // @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  // @ApiResponse({ status: 200, description: 'Trả về danh sách người dùng với profile và roles' })
  // @Get('users')
  // async getUsers(@Query() paginationDto: PaginationDto) {
  //   return await this.adminService.getUsers(paginationDto);
  // }

  // @ApiOperation({ summary: 'Tạo người dùng mới' })
  // @ApiResponse({ status: 201, description: 'Tạo người dùng thành công' })
  // @Post('users')
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   return await this.adminService.createUser(createUserDto);
  // }

  // @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  // @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  // @Patch('users/:id')
  // async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return await this.adminService.updateUser(id, updateUserDto);
  // }

  // @ApiOperation({ summary: 'Xóa người dùng' })
  // @ApiResponse({ status: 200, description: 'Xóa thành công' })
  // @Delete('users/:id')
  // async deleteUser(@Param('id') id: string) {
  //   return await this.adminService.deleteUser(id);
  // }

  // @ApiOperation({ summary: 'Lấy danh sách vai trò' })
  // @ApiResponse({ status: 200, description: 'Trả về danh sách vai trò' })
  // @Get('roles')
  // async getRoles(@Query() paginationDto: PaginationDto) {
  //   return await this.adminService.getRoles(paginationDto);
  // }

  // @ApiOperation({ summary: 'Tạo vai trò mới' })
  // @ApiResponse({ status: 201, description: 'Tạo vai trò thành công' })
  // @Post('roles')
  // async createRole(@Body() createRoleDto: CreateRoleDto) {
  //   return await this.adminService.createRole(createRoleDto);
  // }

  // @ApiOperation({ summary: 'Cập nhật vai trò' })
  // @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  // @Patch('roles/:id')
  // async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return await this.adminService.updateRole(id, updateRoleDto);
  // }

  // @ApiOperation({ summary: 'Xóa vai trò' })
  // @ApiResponse({ status: 200, description: 'Xóa thành công' })
  // @Delete('roles/:id')
  // async deleteRole(@Param('id') id: string) {
  //   return await this.adminService.deleteRole(id);
  // }

  // @ApiOperation({ summary: 'Lấy thống kê tổng quan' })
  // @ApiResponse({ status: 200, description: 'Trả về thống kê tổng quan' })
  // @Get('analysis')
  // async getAnalysis() {
  //   return await this.adminService.getAnalysis();
  // }
}
