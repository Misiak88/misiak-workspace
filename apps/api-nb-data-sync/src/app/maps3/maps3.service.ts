import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MapsApiResponse } from '@misiak-workspace/maps3-nb-data-types';
import { countAvailableBikes } from '@misiak-workspace/maps3-nb-data-types';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { StationSummaryDto } from '@misiak-workspace/api-nb-data-sync-dto';

@Injectable()
export class MapsService {
  private readonly baseUrl: string;
  private readonly queryParams: Record<string, string>;

  constructor(private readonly http: HttpService) {
    const { API_BASE_URL, LOGINKEY, CITY, DETAILS, BIKES, FORMAT } = process.env;
    if (!API_BASE_URL) throw new InternalServerErrorException('Missing API_BASE_URL');
    if (!LOGINKEY)   throw new InternalServerErrorException('Missing LOGINKEY');
    if (!CITY)       throw new InternalServerErrorException('Missing CITY');
    if (!DETAILS)    throw new InternalServerErrorException('Missing DETAILS');
    if (!BIKES)      throw new InternalServerErrorException('Missing BIKES');
    if (!FORMAT)     throw new InternalServerErrorException('Missing FORMAT');

    this.baseUrl = API_BASE_URL;
    this.queryParams = {
      loginkey: LOGINKEY,
      city:     CITY,
      details:  DETAILS,
      bikes:    BIKES,
      format:   FORMAT,
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

    const summariesRaw = root.countries.flatMap(country =>
      country.cities.map(city => {
        // wszystkie miejsca
        const allBikeLists = city.places.flatMap(p => p.bike_list);
        const bikesAvailableToRentInSystem = countAvailableBikes(allBikeLists);

        // tylko stacje (spot === true)
        const stationPlaces = city.places.filter(p => p.spot);
        const stationBikeLists = stationPlaces.flatMap(p => p.bike_list);
        const bikesAvailableToRentInSystemOnlyStations =
          countAvailableBikes(stationBikeLists);

        // DTO stacji
        const stations = stationPlaces.map(place => ({
          uid: place.uid,
          name: place.name,
          number: place.number,
          bikes: place.bikes,
          bikesAvailableToRent: countAvailableBikes(place.bike_list),
        }));

        return {
          domain: country.domain,
          cityName: city.name,
          bikesAvailableToRentInSystem,
          bikesAvailableToRentInSystemOnlyStations,
          stations,
        };
      })
    );

    // Walidacja DTO
    const summariesDto = plainToInstance(StationSummaryDto, summariesRaw);
    for (const dto of summariesDto) {
      const errors = await validate(dto);
      if (errors.length) {
        const msg = errors.flatMap(e => Object.values(e.constraints || {})).join(', ');
        throw new BadRequestException(`Validation failed: ${msg}`);
      }
    }

    return summariesDto;
  }
}
