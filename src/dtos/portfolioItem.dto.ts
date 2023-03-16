import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { Image } from '@/interfaces/portfolioItem.interface';

export class CreatePortfolioItemDto {

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public projectName: string;

  @IsOptional()
  @IsString()
  public location: string;

  @IsOptional()
  @IsString()
  public features: string;

  @IsOptional()
  public images: Array<Image>;

  @IsOptional()
  @IsString()
  public priority: string;

  @IsOptional()
  @IsBoolean()
  public isHighlighted: Boolean;

}
