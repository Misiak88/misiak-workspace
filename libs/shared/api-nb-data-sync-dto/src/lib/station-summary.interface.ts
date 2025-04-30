export interface Station {
  uid: number;
  name: string;
  number: number;
  bikes: number;
  bikesAvailableToRent: number;
  bikesUID?: number;
}

export interface CityStations {
  domain: string;
  cityName: string;
  stations: Station[];
}
