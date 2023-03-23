import { Photo, Price } from "@/interfaces/product.interface";
import { IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    @IsString()
    public name?: string;
  
    @IsOptional()
    @IsString()
    public quantity?: string;
  
    @IsOptional()
    @IsString()
    public price?: Price;
  
    @IsOptional()
    public isActive: boolean;
  
    @IsOptional()
    @IsString()
    public brand: string;

    @IsOptional()
    @IsString()
    public image: Photo;


  }