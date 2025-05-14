import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email của người dùng',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mật khẩu của người dùng',
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token',
  })
  refreshToken: string;
}

export class QueryAuthResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates whether the operation was successful',
  })
  ok: boolean;

  @ApiProperty({
    example: 'Login successful',
    description: 'Message describing the result of the login process',
  })
  message: string;

  @ApiProperty({
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
    description: 'JWT tokens (access and refresh)',
    nullable: true, // data can be null
  })
  data: AuthResponseDto | null;
}

export class ProfileResponseDto {
  @ApiProperty({
    example: '123',
    description: 'ID của người dùng',
  })
  userId: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email của người dùng',
  })
  email: string;
} 