import { IsArray, IsEmail, IsOptional, IsString, MaxLength, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

// Custom validator để so sánh password và confirmPassword
@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: any, args: ValidationArguments) {
        const object = args.object as any;
        const password = object.password;

        // Nếu cả hai đều không có => hợp lệ
        if (!password && !confirmPassword) return true;

        // Nếu chỉ có một trong hai => không hợp lệ
        if (!!password !== !!confirmPassword) return false;

        // Nếu có cả hai => kiểm tra trùng khớp
        return confirmPassword === password;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Confirm password must match password';
    }
}

export class UpdateUserInput {
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    password: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    @Validate(MatchPasswordConstraint)
    confirmPassword: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    roles: string[] = [];
}