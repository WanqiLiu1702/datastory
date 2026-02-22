import './Header.css';

function Header({ totalVenues }) {
  return (
    <header className="header">
      <div className="header-text">
        <h1>London Cultural Venues Explorer</h1>
        <p className="subtitle">
          Explore {totalVenues.toLocaleString()} cultural venues across London boroughs.
          Toggle categories, filter by borough, or search by name to discover patterns in London's cultural landscape.
        </p>
      </div>
      <p className="credit">
        Data source:{' '}
        <a
          href="https://data.london.gov.uk/dataset/cultural-infrastructure-map/"
          target="_blank"
          rel="noopener noreferrer"
        >
          London Datastore — Cultural Infrastructure Map
        </a>
      </p>
    </header>
  );
}

export default Header;
