// apps/api-nb-data-sync/src/app/maps/maps.service.ts
import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MapsApiResponse } from '@misiak-workspace/maps3-nb-data-types';
import { StationSummaryDto } from '@misiak-workspace/api-nb-data-sync-dto';

@Injectable()
export class MapsService {
  private readonly baseUrl: string;
  private readonly queryParams: Record<string, string>;

  constructor(private readonly http: HttpService) {

    const {
      API_BASE_URL,
      LOGINKEY,
      CITY,
      DETAILS,
      BIKES,
      FORMAT,
    } = process.env;

    if (!API_BASE_URL) {
      throw new Error('Missing API_BASE_URL in .env');
    }
    if (!LOGINKEY || !CITY || !DETAILS || !BIKES || !FORMAT) {
      throw new Error('One of LOGINKEY, CITY, DETAILS, BIKES or FORMAT is missing in .env');
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
    const map = new Map<number, StationSummaryDto>();

    for (const country of root.countries) {
      for (const city of country.cities) {
        for (const place of city.places) {
          if (!map.has(place.uid)) {
            map.set(place.uid, {
              domain: country.domain,
              cityName: city.name,
              uid: place.uid,
              name: place.name,
              number: place.number,
              bikes: place.bikes,
              bikesAvailableToRent: place.bikes_available_to_rent,
            });
          }
        }
      }
    }

    return Array.from(map.values());
  }
}
