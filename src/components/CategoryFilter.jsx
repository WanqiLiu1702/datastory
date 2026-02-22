import './CategoryFilter.css';

function CategoryFilter({ datasets, activeCategories, onToggle }) {
  return (
    <div className="category-filter">
      <span className="filter-label">Categories:</span>
      <div className="category-buttons">
        {datasets.map((d) => {
          const isActive = activeCategories.has(d.key);
          return (
            <button
              key={d.key}
              className={`category-btn ${isActive ? 'active' : ''}`}
              style={{
                backgroundColor: isActive ? d.color : 'transparent',
                borderColor: d.color,
                color: isActive ? '#fff' : d.color,
              }}
              onClick={() => onToggle(d.key)}
            >
              <span
                className="color-dot"
                style={{ backgroundColor: isActive ? '#fff' : d.color }}
              />
              {d.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
