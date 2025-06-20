import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminRole } from '../shared/enum/role';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateRoleInputDto } from './dto/input/create-role.input.dto';
import { SearchRoleQueryInput } from '../users/dto/query/search-role.query.input';
import { DeleteRoleInput } from './dto/input/delete-role.input.dto';
import { UsersRolesParamsDto } from '../users/dto/users-roles-params';
import { GetUserListQueryReponse } from '../users/dto/query/get-userList.query.response';
import { GetUserDetailsResponseQuery } from './dto/query/get-userDetails.response.query';
import { UpdateUserInput } from './dto/input/update-user.input';

@ApiTags('admin')
@Roles(AdminRole.AdminAccess)
@UseGuards(AuthGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 201, description: 'Create role success' })
  @Roles(AdminRole.RoleCreate)
  @Post("/role")
  async createRole(@Body() body: CreateRoleInputDto) {
    return await this.adminService.createRole(body);
  } 

  @ApiOperation({ summary: 'Get role' })
  @ApiResponse({ status: 200, description: 'Get role success' })
  @Roles(AdminRole.RoleRead)
  @Get("/roles")
  async getRoleAndCountAll(@Query() searchParams: SearchRoleQueryInput) {
    const res = await this.adminService.getRoleAndCountAll(searchParams);
    return res;
    
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({ status: 200, description: 'Delete role success' })
  @Roles(AdminRole.RoleDelete)
  @Delete("/role")
  async deleteRole(@Body() body: DeleteRoleInput) {
    return await this.adminService.deleteRole(body.id);
  }

  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({ status: 200, description: 'Get role by id success' })
  @Roles(AdminRole.RoleRead)
  @Get("/role/:roleId")
  async getRoleById(@Param("roleId") roleId: string) {
    return await this.adminService.getRole(roleId);
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200, description: 'Update role success' })
  @Roles(AdminRole.RoleUpdate)
  @Put("/role/:roleId")
  async updateRole(@Param("roleId") roleId: string, @Body() body: CreateRoleInputDto) {
    return await this.adminService.updateRole(roleId, body);
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, description: 'Get users success', type: GetUserListQueryReponse, isArray: true })
  @Roles(AdminRole.UserRead)
  @Get("/users")
  async getUsers(@Query() searchParams: UsersRolesParamsDto) {
    return await this.adminService.getUsers(searchParams);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Get user by id success', type: GetUserDetailsResponseQuery })
  @Roles(AdminRole.UserRead)
  @Get("/user/:userId")
  async getUserById(@Param("userId") userId: string) {
    return await this.adminService.getUser(userId);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'Update user success' })
  @Roles(AdminRole.UserUpdate)
  @Put("/user/:userId")
  async updateUser(@Param("userId") userId: string, @Body() body: UpdateUserInput) {
    return await this.adminService.updateUser(userId, body);
  }



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

  @ApiOperation({ summary: 'Lấy thống kê tổng quan' })
  @ApiResponse({ status: 200, description: 'Trả về thống kê tổng quan' })
  @Get('analysis')
  async getAnalysis() {
    return await this.adminService.getAnalysis();
  }
}
