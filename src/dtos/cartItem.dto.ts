import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCartItemDto {

    @IsString()
    public products?: string; 

    @IsString()
    @IsNotEmpty()
    public user?: string;
}

export class CreateCartDto {
    
    @IsString()
    public product?: string;

    @IsString()
    @IsOptional()
    public quantity?: string;

    @IsString()
    @IsOptional()
    public status?: string;
}