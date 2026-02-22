import './BoroughFilter.css';

function BoroughFilter({ boroughs, selected, onChange }) {
  return (
    <div className="borough-filter">
      <label className="filter-label" htmlFor="borough-select">
        Borough:
      </label>
      <select
        id="borough-select"
        className="borough-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Boroughs</option>
        {boroughs.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BoroughFilter;
