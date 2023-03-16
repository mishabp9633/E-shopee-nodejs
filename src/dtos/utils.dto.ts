import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class LocationDataDto {

  @IsNotEmpty()
  public originCoordinates: [number,number];

  @IsNotEmpty()
  public destinationCoordinates: [number,number];

}

export class SmsDataDto {

  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsNotEmpty()
  @IsString()
  public otp: string;

}

export class EmailDataDto {

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public storeName: string;

  @IsNotEmpty()
  @IsString()
  public itemsCount: Number;

  @IsNotEmpty()
  @IsString()
  public totalPrice: Number;

  @IsNotEmpty()
  @IsString()
  public customerName: string;

}
