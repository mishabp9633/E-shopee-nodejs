import { ROLE } from '@/models/user.model';
import { IsOptional, IsString, IsNotEmpty, IsEnum, IsBoolean, Validate } from 'class-validator';

export enum USER_CUSTOM {
  USER = 'user',
  ADMIN = 'admin',
}

class MatchConstraint {
  validate(value: any, { object }: any) {
    const confirmPassword = object.confirmPassword;
    return !confirmPassword || value === confirmPassword;
  }

  defaultMessage() {
    return 'Passwords do not match';
  }
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  public firstname?: string;

  @IsOptional()
  @IsString()
  public lasstname?: string;

  @IsOptional()
  @IsString()
  public phone?: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class RegisterGuestDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public phoneNumber?: string;

  @IsNotEmpty()
  @IsString()
  public email: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class CreateGuestDto {
  @IsNotEmpty()
  @IsString()
  public email: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public phone?: string;
}

export class UpdateUserByAdminDto {
  @IsOptional()
  @IsString()
  public email?: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsNotEmpty()
  public phone: string;

  @IsNotEmpty()
  @IsBoolean()
  public isPrime: Boolean;

  @IsEnum(ROLE)
  public role: ROLE;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  public oldPassword: string;

  @IsNotEmpty()
  @IsString()
  public newPassword: string;
}

export class ForgotUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  public email: string;
}

export class ResetUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Validate(MatchConstraint)
  public confirmPassword: string;
}

