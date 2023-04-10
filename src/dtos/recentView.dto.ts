import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRecentViewDto {
    
    @IsOptional()
    public userId?: string;

    @IsOptional()
    public products?: Array<string>;
}