import { IsNumberString } from 'class-validator';

export class ReverseGeoCodeDto {
  @IsNumberString()
  public lat: string;

  @IsNumberString()
  public lon: string;
}
