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
  bikesAvailableToRentInSystem: number;
  bikesAvailableToRentInSystemOnlyStations: number;
  stations: Station[];
}
