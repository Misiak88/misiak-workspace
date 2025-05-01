import {
  IsNumber,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Station, CityStations } from './station-summary.interface';


export class StationDto implements Station {
  @IsNumber()
  uid!: number;

  @IsString()
  name!: string;

  @IsNumber()
  number!: number;

  @IsNumber()
  bikes!: number;

  @IsNumber()
  bikesAvailableToRent!: number;

  @IsOptional()
  @IsNumber()
  bikesUID?: number;
}

export class StationSummaryDto implements CityStations {
  @IsString()
  domain!: string;

  @IsString()
  cityName!: string;

  @IsNumber()
  bikesAvailableToRentInSystem!: number;

  @IsNumber()
  bikesAvailableToRentInSystemOnlyStations!: number;

  @ValidateNested({ each: true })
  @Type(() => StationDto)
  stations!: StationDto[];
}
