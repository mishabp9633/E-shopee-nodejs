import { IsNotEmpty, IsString, IsOptional, isNotEmpty } from 'class-validator';

export class CreateWishlistDto {
    
    @IsOptional()
    public userId?: string;

    @IsOptional()
    public products?: Array<string>;
}