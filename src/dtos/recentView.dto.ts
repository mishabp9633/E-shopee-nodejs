import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRecentViewDto {
    
    @IsString()
    @IsNotEmpty()
    public userId?: string;

    @IsNotEmpty()
    public products?: Array<string>;
}