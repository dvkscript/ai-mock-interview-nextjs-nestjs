import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "../../entities/role.entity";
import { UserEntity } from "../../entities/user.entity";
import { UserProviderEntity } from "../../entities/user_provider.entity";

export class GetUserListQueryReponse {
  @ApiProperty({ example: 'user-123', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'Nguyen Van A', description: 'Full name' })
  fullName: string;

  @ApiProperty({ example: 'email@example.com', description: 'Email address' })
  email: string;

  @ApiProperty({ example: 'hashedpassword', description: 'Password (optional)', required: false })
  password?: string;

  @ApiProperty({ example: new Date(), description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: 'Last updated date' })
  updatedAt: Date;

  @ApiProperty({ example: 'https://example.com/image.png', description: 'User thumbnail image URL' })
  thumbnail: string;

  @ApiProperty({ type: () => RoleEntity, isArray: true })
  roles: RoleEntity[];

  @ApiProperty({ type: () => UserProviderEntity, required: false })
  provider?: UserProviderEntity;

  constructor(data: UserEntity) {
    this.id = data.id;
    this.fullName = data.fullName;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.thumbnail = data.profile?.thumbnail;
    this.roles = data.roles;
    this.provider = data.providers[0];
  }
}