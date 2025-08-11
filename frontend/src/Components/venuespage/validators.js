export function isValidPriceRange(min, max) {
  if (min === '' || max === '') return true; // empty means no filter
  const mi = Number(min);
  const ma = Number(max);
  return !Number.isNaN(mi) && !Number.isNaN(ma) && mi >= 0 && ma >= 0 && mi <= ma;
}