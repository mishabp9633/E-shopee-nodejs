import { Photo, Price } from "@/interfaces/product.interface";
import { IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    @IsString()
    public name?: string;

    @IsOptional()
    @IsString()
    public description?: string;
  
    @IsOptional()
    @IsString()
    public stock?: number;

    @IsOptional()
    @IsString()
    public category?: string;

    @IsOptional()
    @IsString()
    public color?: string;

    @IsOptional()
    public price?: Price;
  
    @IsOptional()
    public isActive: boolean;
  
    @IsOptional()
    @IsString()
    public brand: string;

    // @IsOptional()
    // @IsString()
    // public image: Photo;


  }