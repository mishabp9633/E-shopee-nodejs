import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCartItemDto {
    
    @IsOptional()
    public product?: string;

    @IsString()
    @IsOptional()
    public quantity?: string;

    @IsString()
    @IsOptional()
    public status?: string;
}

export class CreateCartDto {
    
    @IsOptional()
    public products?: Array<any>; 

    @IsOptional()
    public userId?: string;
}