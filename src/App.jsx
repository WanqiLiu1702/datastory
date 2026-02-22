import { useState, useMemo } from 'react';
import { useVenueData } from './hooks/useVenueData';
import { DATASETS } from './utils/dataConfig';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import BoroughFilter from './components/BoroughFilter';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import BarChartPanel from './components/BarChartPanel';
import StatsPanel from './components/StatsPanel';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const { venues, loading, error } = useVenueData();

  const [activeCategories, setActiveCategories] = useState(new Set(['museums']));
  const [selectedBorough, setSelectedBorough] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const allBoroughs = useMemo(() => {
    const set = new Set(venues.map((v) => v.borough));
    return [...set].sort();
  }, [venues]);

  const filteredVenues = useMemo(() => {
    return venues.filter((v) => {
      if (!activeCategories.has(v.category)) return false;
      if (selectedBorough && v.borough !== selectedBorough) return false;
      if (searchTerm && !v.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return false;
      return true;
    });
  }, [venues, activeCategories, selectedBorough, searchTerm]);

  const toggleCategory = (key) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Failed to load data: {error}</div>;

  return (
    <div className="app">
      <Header totalVenues={venues.length} />
      <div className="controls">
        <CategoryFilter
          datasets={DATASETS}
          activeCategories={activeCategories}
          onToggle={toggleCategory}
        />
        <div className="controls-row">
          <BoroughFilter
            boroughs={allBoroughs}
            selected={selectedBorough}
            onChange={setSelectedBorough}
          />
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>
      <StatsPanel venues={filteredVenues} datasets={DATASETS} />
      <div className="main-content">
        <MapView venues={filteredVenues} />
        <div className="charts-sidebar">
          <BarChartPanel venues={filteredVenues} />
        </div>
      </div>
    </div>
  );
}

export default App;
