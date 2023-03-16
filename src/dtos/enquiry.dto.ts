import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateEnquiryDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsNumber()
  public phone?: number;

  @IsOptional()
  @IsString()
  public email?: string;

  @IsOptional()
  @IsString()
  public message?: string;

  @IsOptional()
  @IsString()
  public place?: string;

  @IsOptional()
  @IsString()
  public category?: string;

  @IsOptional()
  @IsString()
  public status?: string;

  @IsOptional()
  @IsBoolean()
  public isOpened?: string;
}
