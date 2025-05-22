import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ description: 'Tên vai trò', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Mô tả vai trò', required: false })
  @IsString()
  @IsOptional()
  description?: string;
} 