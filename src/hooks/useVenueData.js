import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { DATASETS } from '../utils/dataConfig';
import { normalizeVenue } from '../utils/normalizeVenue';

export function useVenueData() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const results = await Promise.all(
          DATASETS.map(async (dataset) => {
            const response = await fetch(dataset.url);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${dataset.label}`);
            }
            const csvText = await response.text();
            const parsed = Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              transformHeader: (h) => h.trim().toLowerCase(),
            });
            return parsed.data
              .map((row) => normalizeVenue(row, dataset))
              .filter((v) => v !== null);
          })
        );
        setVenues(results.flat());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { venues, loading, error };
}
