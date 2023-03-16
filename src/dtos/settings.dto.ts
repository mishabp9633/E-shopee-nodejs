import { Company, MultiLanguange, Legal, Shipping, SpecialMessages, TaxDetails, Setup } from '@/interfaces/settings.interface';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSettingsDto {
  @IsOptional()
  public company: Company;

  @IsOptional()
  public taxDetails: TaxDetails;

  @IsOptional()
  public shipping: Shipping;

  @IsOptional()
  public legal: Legal;

  @IsOptional()
  public setup: Setup;

  @IsOptional()
  public productProperties: Array<string>;

  @IsOptional()
  public classifications: Array<string>;

  @IsOptional()
  public specialMessages: SpecialMessages;

  @IsOptional()
  public multiLanguange: MultiLanguange;

}