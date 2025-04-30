import { IsNumber, IsString, IsOptional } from 'class-validator';

export class StationSummaryDto {
  @IsString()
  domain: string;

  @IsString()
  cityName: string;

  @IsNumber()
  uid: number;

  @IsString()
  name: string;

  @IsNumber()
  number: number;

  @IsNumber()
  bikes: number;

  @IsNumber()
  bikesAvailableToRent: number;

  @IsOptional()
  @IsNumber()
  bikesUID?: number;

  constructor() {
    this.domain = '';
    this.cityName = '';
    this.uid = 0;
    this.name = '';
    this.number = 0;
    this.bikes = 0;
    this.bikesAvailableToRent = 0;
  }
}
