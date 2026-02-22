import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text">Loading London cultural venues...</p>
    </div>
  );
}

export default LoadingSpinner;
