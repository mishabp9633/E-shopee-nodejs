import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCartItemDto {
    
    @IsString()
    public product?: string;

    @IsString()
    @IsOptional()
    public quantity?: string;

    @IsString()
    @IsOptional()
    public status?: string;
}

export class CreateCartDto {
    
    @IsString()
    public products?: string; 

    @IsString()
    @IsNotEmpty()
    public userId?: string;
}