import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label className="filter-label" htmlFor="search-input">
        Search:
      </label>
      <div className="search-input-wrapper">
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search venue name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button className="clear-btn" onClick={() => onChange('')}>
            &times;
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
