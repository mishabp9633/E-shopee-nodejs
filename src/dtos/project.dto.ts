import { Credential, Finance, History, Requirement, Segment } from '@/interfaces/project.interface';
import { IsString, IsOptional } from 'class-validator';


export class CreateProjectDto {
  @IsOptional()
  @IsString()
  public organization?: string;

  @IsOptional()
  @IsString()
  public client?: string;

  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public category?: string;

  @IsOptional()
  @IsString()
  public status?: string;

  @IsOptional()
  public segment?: Array<Segment>;

  @IsOptional()
  public finance?: Finance;

  @IsOptional()
  public history?: History;

  @IsOptional()
  public requirements?: Array<Requirement>;

  @IsOptional()
  public credentials?: Array<Credential>;

  @IsOptional()
  @IsString()
  public note?: string;

}
