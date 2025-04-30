import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MapsApiResponse } from '@misiak-workspace/maps3-nb-data-types';
import { StationSummaryDto } from '@misiak-workspace/api-nb-data-sync-dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class MapsService {
  private readonly baseUrl: string;
  private readonly queryParams: Record<string, string>;

  constructor(private readonly http: HttpService) {
    const API_BASE_URL = process.env.API_BASE_URL;
    const LOGINKEY = process.env.LOGINKEY;
    const CITY = process.env.CITY;
    const DETAILS = process.env.DETAILS;
    const BIKES = process.env.BIKES;
    const FORMAT = process.env.FORMAT;

    if (!API_BASE_URL) {
      throw new InternalServerErrorException('Missing API_BASE_URL in .env');
    }
    if (!LOGINKEY) {
      throw new InternalServerErrorException('Missing LOGINKEY in .env');
    }
    if (!CITY) {
      throw new InternalServerErrorException('Missing CITY in .env');
    }
    if (!DETAILS) {
      throw new InternalServerErrorException('Missing DETAILS in .env');
    }
    if (!BIKES) {
      throw new InternalServerErrorException('Missing BIKES in .env');
    }
    if (!FORMAT) {
      throw new InternalServerErrorException('Missing FORMAT in .env');
    }

    this.baseUrl = API_BASE_URL;
    this.queryParams = {
      loginkey: LOGINKEY,
      city: CITY,
      details: DETAILS,
      bikes: BIKES,
      format: FORMAT,
    };
  }

  private async fetchRaw(): Promise<MapsApiResponse> {
    const resp$ = this.http.get<MapsApiResponse>(this.baseUrl, {
      params: this.queryParams,
    });
    const { data } = await firstValueFrom(resp$);
    return data;
  }

  async getPlaces(): Promise<StationSummaryDto[]> {
    const root = await this.fetchRaw();

    const stations = root.countries.flatMap(country =>
      country.cities.flatMap(city =>
        city.places.map(place => ({
          domain: country.domain,
          cityName: city.name,
          uid: place.uid,
          name: place.name,
          number: place.number,
          bikes: place.bikes,
          bikesAvailableToRent: place.bikes_available_to_rent,
          //bikesUID: place.uid || undefined,
        })),
      ),
    );

    const unique = Array.from(
      new Map(stations.map(s => [s.uid, s])).values(),
    );


    const dtos = plainToInstance(StationSummaryDto, unique);


    for (const dto of dtos) {
      const errors = await validate(dto);
      if (errors.length > 0) {

        const constraints = errors
          .flatMap(error => Object.values(error.constraints || {}))
          .join(', ');

        throw new BadRequestException(`Validation failed: ${constraints}`);
      }
    }

    return dtos;
  }
}
