import { BikeList } from '../models';

/**
 * Zlicza rowery dostępne do wypożyczenia.
 * Uznaje za dostępne te, których `bike.active === '1'`.
 */
export function countAvailableBikes(bikeList: BikeList[]): number {
  return bikeList.filter(bike => bike.active === '1').length;
}
