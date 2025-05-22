import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Email người dùng', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Họ tên người dùng', required: false })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty({ description: 'Mật khẩu', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ description: 'ID vai trò', required: false })
  @IsUUID()
  @IsOptional()
  role_id?: string;
} 