import { IsString, IsOptional, IsNotEmpty } from 'class-validator';


export class CreateProjectSegmentDto {
  @IsNotEmpty()
  @IsString()
  public title?: string;

  @IsNotEmpty()
  @IsString()
  public description?: string;

  @IsOptional()
  public options?: Array<string>;
}
