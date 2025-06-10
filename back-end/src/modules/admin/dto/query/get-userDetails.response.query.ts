import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "src/modules/users/entities/role.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UserProfileEntity } from "src/modules/users/entities/user_profile.entity";
import { UserTemporaryPermissionEntity } from "src/modules/users/entities/users_temporary_permissions";

export class GetUserDetailsResponseQuery {
  @ApiProperty({ example: 'user-123', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'Nguyen Van A', description: 'Full name' })
  fullName: string;

  @ApiProperty({ example: 'email@example.com', description: 'Email address' })
  email: string;

  @ApiProperty({ example: 'https://example.com/image.png', description: 'User thumbnail image URL' })
  thumbnail: string;

  @ApiProperty({ example: new Date(), description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: 'Last updated date' })
  updatedAt: Date;

  @ApiProperty({ type: () => RoleEntity, isArray: true, description: 'User roles' })
  roles: RoleEntity[];

  @ApiProperty({ type: () => UserTemporaryPermissionEntity, isArray: true, description: 'User temporary permissions' })
  temporaryPermissions: UserTemporaryPermissionEntity[]

  constructor(data: UserEntity) {
    this.id = data.id;
    this.fullName = data.fullName;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.roles = data.roles;
    this.thumbnail = data.profile?.thumbnail;
    this.temporaryPermissions = data.temporaryPermissions;
  }
}