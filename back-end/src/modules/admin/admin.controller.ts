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
import { GetJobsPaginationQuery } from '../jobs/dto/query/get-jobs.pagination.query';
import { GetPayWithUserAndCountAllQuery } from '../pay/dto/query/get-payWithUserAndCountAll.query';

@ApiTags('admin')
@Roles(AdminRole.AdminAccess)
@UseGuards(AuthGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ) { }

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

  @ApiOperation({ summary: "Get Jobs All" })
  @ApiResponse({ status: 200, description: "Get Job All success" })
  @Roles(AdminRole.JobRead)
  @Get("/jobs")
  async getJobs(
    @Query() params: GetJobsPaginationQuery
  ) {
    return await this.adminService.getJobs(params);
  }

  @ApiOperation({ summary: "Get Pays All" })
  @ApiResponse({ status: 200, description: "Get Pays All success" })
  @Roles(AdminRole.PaymentRead)
  @Get("/pays")
  async getPays(
    @Query() params: GetPayWithUserAndCountAllQuery
  ) {
    return await this.adminService.getPays(params);
  }

  @ApiOperation({ summary: 'Lấy thống kê tổng quan' })
  @ApiResponse({ status: 200, description: 'Trả về thống kê tổng quan' })
  @Get('analysis')
  async getAnalysis(
    @Query('limit') limit: string
  ) {
    return await this.adminService.getAnalysis(limit);
  }
}
