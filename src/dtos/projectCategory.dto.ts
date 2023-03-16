import { Image } from '@/interfaces/projectCategory.interface';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';


export class CreateProjectCategoryDto {
  @IsNotEmpty()
  @IsString()
  public title?: string;

  @IsNotEmpty()
  @IsString()
  public description?: string;

  @IsOptional()
  public images?: Array<Image>;
}


