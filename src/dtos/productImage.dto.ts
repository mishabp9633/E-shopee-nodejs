import { Photo } from '@/interfaces/product.interface';
import {  IsString, IsOptional } from 'class-validator';

export class CreateProductImageDto {
    
    @IsOptional()
    public images?: Photo;
}