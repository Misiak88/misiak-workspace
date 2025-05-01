export interface Country {
  lat: number
  lng: number
  zoom: number
  name: string
  hotline: string
  domain: string
  language: string
  email: string
  timezone: any
  currency: string
  country_calling_code: string
  system_operator_address: string
  country: any
  country_name: any
  terms: string
  policy: string
  website: string
  show_bike_types: boolean
  show_bike_type_groups: boolean
  show_free_racks: boolean
  booked_bikes: number
  set_point_bikes: number
  available_bikes: number
  capped_available_bikes: boolean
  no_registration: boolean
  pricing: string
  vat: any
  faq_url: string
  store_uri_android: string
  store_uri_ios: string
  cities: City[]
}

export interface City {
  uid: number
  lat: number
  lng: number
  zoom: number
  maps_icon: any
  alias: string
  break: boolean
  name: string
  num_places: any
  refresh_rate: any
  bounds: Bounds
  booked_bikes: number
  set_point_bikes: number
  available_bikes: number
  return_to_official_only: boolean
  bike_types: BikeTypes
  website: string
  places: Place[]
}

export interface Bounds {
  south_west: SouthWest
  north_east: NorthEast
}

export interface SouthWest {
  lat: number
  lng: number
}

export interface NorthEast {
  lat: number
  lng: number
}

export interface BikeTypes {}

export interface Place {
  uid: number
  lat: number
  lng: number
  name: string
  spot: boolean
  number: number
  station_priority: number
  move: number
  urgent_move: number
  booked_bikes: number
  booked_biketypes: any
  bikes: number
  total: number
  active: number
  check: number
  visit: boolean
  visits: string
  lent: number
  set: number
  active_place: boolean
  online: number
  lowest_batt: number
  recognized: boolean
  show_in_map: boolean
  num_rentals_last_month: number
  bike_racks: number
  free_racks: number
  special_racks: number
  free_special_racks: number
  bonus_minutes: number
  maintenance: boolean
  repair_needed: boolean
  place_type: number
  terminal_type: string
  terminal_list: TerminalList[]
  bike_list: BikeList[]
}

export interface TerminalList {
  uid: string
  online: boolean
  tstamp: string
  software_version: string
  system_version: string
  racks: string
  booted?: string
  stv_version?: string
  stv_state?: string
  battery_voltage?: string
  solar_voltage?: string
  temperature?: string
  lock_version?: string
  debug?: string
  brightness?: string
  humidity?: string
  snap_id?: string
  kernel_state?: string
  connection_mode?: string
  serial_number?: string
  uptime?: string
  last_ui_comm?: string
  egalax_cpu?: string
  battery_current?: string
  webapp_version?: string
  payment_version?: string
  payment_status?: string
  lock_states?: string
  imsi?: string
  iccid?: string
  sim_signal?: string
  imei?: string
  software_release?: string
  mac_address?: string
  fvcs?: string
}

export interface BikeList {
  uid: string
  bike_name: string
  rfid_uid: string
  frame_number: string
  code_new: string
  last_rental_uid?: string
  last_lending?: string
  last_lending_end?: string
  last_communication?: string
  last_customer_id?: string
  last_bikecheck: string
  campaign_end_time?: string
  street2: string
  active: string
  is_lent: string
  formfactor_id: string
  repair: string
  checked: string
  needs_codechange: boolean
  lock_types: string
  electric_lock: string
  missed: string
  campaign_id: string
  pedelec: string
  biketype_id: string
  unlocked: string
  has_helmet_box: string
  has_helmet: string
  formfactor_type: string
  campaign_name?: string
  boardcomputer?: string
  snap?: string
  last_communication_snap?: string
  snap_rev_date?: string
  firmware?: string
  hardware_version?: string
  battery?: string
  locked_bike?: string
  is_charging?: string
  last_customer_phonenumber?: string
  last_customer_name?: string
  internal_comments: string
  pedelec_battery: string
  service_case_id?: string
  signs: string
  battery_level_percent: number
  battery_state: string
  rfid_battery_voltage?: number
  rfid_battery_state?: string
  locked_in_rack: boolean
  locked: number
  has_battery_lock: boolean
  tracking_list?: TrackingList[]
}

export interface TrackingList {
  timestamp: string
  lat: string
  lng: string
  accuracy: string
}
