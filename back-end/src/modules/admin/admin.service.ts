// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { PaginationDto } from '../jobs/dto/query/pagination.dto';
// import * as bcrypt from 'bcrypt';
// import { Op, fn, col } from 'sequelize';

// @Injectable()
// export class AdminService {
//   constructor(

//   ) {}

//   async getUsers(paginationDto: PaginationDto) {
//     const { page = 1, limit = 10 } = paginationDto;
//     const offset = (page - 1) * limit;

//     const { count, rows: users } = await this.userModel.findAndCountAll({
//       include: [
//         {
//           model: Role,
//           through: { attributes: [] },
//         },
//       ],
//       offset,
//       limit,
//     });

//     return {
//       data: users,
//       total: count,
//       page,
//       limit,
//     };
//   }

//   async createUser(createUserDto: CreateUserDto) {
//     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
//     const user = await this.userModel.create({
//       ...createUserDto,
//       password: hashedPassword,
//     });
//     return user;
//   }

//   async updateUser(id: string, updateUserDto: UpdateUserDto) {
//     const user = await this.userModel.findByPk(id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     if (updateUserDto.password) {
//       updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
//     }

//     await user.update(updateUserDto);
//     return user;
//   }

//   async deleteUser(id: string) {
//     const user = await this.userModel.findByPk(id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//     await user.destroy();
//     return { id };
//   }

//   async getRoles(paginationDto: PaginationDto) {
//     const { page = 1, limit = 10 } = paginationDto;
//     const offset = (page - 1) * limit;

//     const { count, rows: roles } = await this.roleModel.findAndCountAll({
//       offset,
//       limit,
//     });

//     return {
//       data: roles,
//       total: count,
//       page,
//       limit,
//     };
//   }

//   async createRole(createRoleDto: CreateRoleDto) {
//     const role = await this.roleModel.create(createRoleDto);
//     return role;
//   }

//   async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
//     const role = await this.roleModel.findByPk(id);
//     if (!role) {
//       throw new NotFoundException('Role not found');
//     }

//     await role.update(updateRoleDto);
//     return role;
//   }

//   async deleteRole(id: string) {
//     const role = await this.roleModel.findByPk(id);
//     if (!role) {
//       throw new NotFoundException('Role not found');
//     }
//     await role.destroy();
//     return { id };
//   }

//   async getAnalysis() {
//     const [totalRevenue] = await this.payModel.findAll({
//       attributes: [
//         [fn('SUM', col('amount')), 'total'],
//       ],
//       raw: true,
//     });

//     const totalUsers = await this.userModel.count();
//     const totalJobs = await this.jobModel.count();

//     return {
//       totalRevenue: totalRevenue?.total || 0,
//       totalUsers,
//       totalJobs,
//     };
//   }
// }
