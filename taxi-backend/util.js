export const getMinMaxValues = (trips) => {
    const fareAmounts = trips.map((trip) => trip.fare_amount);
    const distances = trips.map((trip) => trip.trip_distance);
  
    return {
      minFare: Math.min(...fareAmounts),
      maxFare: Math.max(...fareAmounts),
      minDistance: Math.min(...distances),
      maxDistance: Math.max(...distances),

    };
  };