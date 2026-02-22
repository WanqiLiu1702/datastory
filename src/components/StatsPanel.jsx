import './StatsPanel.css';

function StatsPanel({ venues, datasets }) {
  const boroughCount = new Set(venues.map((v) => v.borough)).size;
  const activeCategoryCount = new Set(venues.map((v) => v.category)).size;

  return (
    <div className="stats-panel">
      <div className="stat-card">
        <span className="stat-number">{venues.length.toLocaleString()}</span>
        <span className="stat-label">Venues</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{boroughCount}</span>
        <span className="stat-label">Boroughs</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{activeCategoryCount}</span>
        <span className="stat-label">Categories</span>
      </div>
    </div>
  );
}

export default StatsPanel;
