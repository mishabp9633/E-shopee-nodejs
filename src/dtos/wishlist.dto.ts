import { IsNotEmpty, IsString, IsOptional, isNotEmpty } from 'class-validator';

export class CreateWishlistDto {
    
    @IsString()
    @IsNotEmpty()
    public userId?: string;

    @IsNotEmpty()
    public products?: Array<string>;
}