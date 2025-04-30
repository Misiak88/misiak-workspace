export interface Country {
  lat: number;
  lng: number;
  zoom: number;
  name: string;
  hotline: string;
  domain: string;
  language: string;
  email: string;
  timezone: string;
  currency: string;
  country_calling_code: string;
  system_operator_address: string;
  country: string;
  country_name: string;
  terms: string;
  policy: string;
  website: string;
  show_bike_types: boolean;
  show_bike_type_groups: boolean;
  show_free_racks: boolean;
  booked_bikes: number;
  set_point_bikes: number;
  available_bikes: number;
  capped_available_bikes: boolean;
  no_registration: boolean;
  pricing: string;
  vat: string;
  faq_url: string;
  store_uri_android: string;
  store_uri_ios: string;
  cities: City[];
}

export interface City {
  uid: number;
  lat: number;
  lng: number;
  zoom: number;
  maps_icon: string;
  alias: string;
  break: boolean;
  name: string;
  num_places: number;
  refresh_rate: string;
  bounds: Bounds;
  booked_bikes: number;
  set_point_bikes: number;
  available_bikes: number;
  return_to_official_only: boolean;
  bike_types: BikeTypes;
  website: string;
  places: Place[];
}

export interface Bounds {
  south_west: Coordinate;
  north_east: Coordinate;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface BikeTypes {
  "196": number;
  "346": number;
}

export interface Place {
  uid: number;
  lat: number;
  lng: number;
  bike: boolean;
  name: string;
  address?: string;
  spot: boolean;
  number: number;
  booked_bikes: number;
  bikes: number;
  bikes_available_to_rent: number;
  bike_racks: number;
  free_racks: number;
  special_racks: number;
  free_special_racks: number;
  maintenance: boolean;
  terminal_type: string;
  bike_list: BikeList[];
  bike_numbers: string[];
  bike_types: BikeTypes2;
  place_type: string;
  rack_locks: boolean;
}

export interface BikeList {
  number: string;
  bike_type: number;
  lock_types: string[];
  active: boolean;
  state: string;
  electric_lock: boolean;
  boardcomputer: number;
  pedelec_battery: any;
  battery_pack: any;
}

export interface BikeTypes2 {
  "196"?: number;
}
