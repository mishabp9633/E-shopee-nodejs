import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRecentViewDto {
    
    @IsString()
    @IsOptional()
    public userId?: string;

    @IsNotEmpty()
    public products?: Array<string>;
}