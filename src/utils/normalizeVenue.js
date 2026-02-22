export function normalizeVenue(row, dataset) {
  const lat = parseFloat(row.latitude);
  const lng = parseFloat(row.longitude);

  if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return null;

  const rawBorough = (row.borough_name || '').trim();
  const borough = rawBorough
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: `${dataset.key}-${lat}-${lng}-${(row.name || '').trim()}`,
    name: (row.name || 'Unknown').trim(),
    address: [row.address1, row.address2, row.address3]
      .filter(Boolean)
      .map((s) => s.trim())
      .filter(Boolean)
      .join(', '),
    borough,
    website: (row.website || '').trim(),
    lat,
    lng,
    category: dataset.key,
    categoryLabel: dataset.label,
    categoryColor: dataset.color,
  };
}
