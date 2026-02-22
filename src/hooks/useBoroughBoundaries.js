import { useState, useEffect } from 'react';

const GEOJSON_URL =
  'https://raw.githubusercontent.com/radoi90/housequest-data/master/london_boroughs.geojson';

export function useBoroughBoundaries() {
  const [boundaries, setBoundaries] = useState(null);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => setBoundaries(data))
      .catch(() => {});
  }, []);

  return boundaries;
}
