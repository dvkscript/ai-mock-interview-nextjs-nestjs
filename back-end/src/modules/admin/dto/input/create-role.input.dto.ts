import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AdminRole } from "src/modules/shared/enum/role";

export class CreateRoleInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsEnum(AdminRole, { each: true })
  permissions: AdminRole[];
}