function VenuePopup({ venue }) {
  return (
    <div style={{ minWidth: 180, fontSize: '0.85rem', lineHeight: 1.5 }}>
      <strong style={{ fontSize: '0.95rem' }}>{venue.name}</strong>
      <div style={{ marginTop: 4 }}>
        <span
          style={{
            display: 'inline-block',
            padding: '1px 8px',
            borderRadius: 10,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#fff',
            backgroundColor: venue.categoryColor,
          }}
        >
          {venue.categoryLabel}
        </span>
      </div>
      {venue.address && (
        <div style={{ marginTop: 6, color: '#555' }}>{venue.address}</div>
      )}
      <div style={{ color: '#777', marginTop: 2 }}>{venue.borough}</div>
      {venue.website && (
        <div style={{ marginTop: 6 }}>
          <a
            href={venue.website.startsWith('http') ? venue.website : `https://${venue.website}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#6366f1', fontSize: '0.8rem' }}
          >
            Visit website
          </a>
        </div>
      )}
    </div>
  );
}

export default VenuePopup;
