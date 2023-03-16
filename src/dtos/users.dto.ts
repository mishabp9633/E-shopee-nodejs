import { ROLE } from '@/models/user.model';
import { IsOptional, IsString, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';

export enum USER_CUSTOM {
  ALL = 'all',
  USER = 'user',
  PRIME_USER = 'prime-user',
  STORE_ADMIN = 'store-admin',
  ADMIN = 'admin',
}

export class SignUpWithMobileDto {
  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsOptional()
  @IsString()
  public referalCode?: string;
}

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsNotEmpty()
  @IsString()
  public otp: string;
}

export class LoginWithMobileDto {
  @IsNotEmpty()
  @IsString()
  public phone: string;
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  public name?: string;

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
  public newPassword: string;

  @IsOptional()
  @IsString()
  public confirmPassword: string;
}
