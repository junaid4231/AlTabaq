/**
 * Haversine formula to calculate distance between two coordinates in kilometers.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Checks if the current time is within any of the defined delivery shifts.
 */
export function isDeliveryActive(
  shift1Start: string = "12:00",
  shift1End: string = "16:00",
  shift2Start: string = "18:00",
  shift2End: string = "23:00"
): boolean {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const s1Start = parseTime(shift1Start);
  const s1End = parseTime(shift1End);
  const s2Start = parseTime(shift2Start);
  const s2End = parseTime(shift2End);

  return (
    (currentTime >= s1Start && currentTime <= s1End) ||
    (currentTime >= s2Start && currentTime <= s2End)
  );
}

/**
 * Calculates delivery fee based on distance.
 */
export function calculateDeliveryFee(
  distance: number,
  freeRadius: number = 5,
  costPerKm: number = 3
): number {
  if (distance <= freeRadius) return 0;
  // Rounds up to the nearest km for fair pricing
  const extraKm = Math.ceil(distance - freeRadius);
  return extraKm * costPerKm;
}
