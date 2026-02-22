import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON } from 'react-leaflet';
import VenuePopup from './VenuePopup';
import { useBoroughBoundaries } from '../hooks/useBoroughBoundaries';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

const boundaryStyle = {
  color: '#888',
  weight: 1,
  fillColor: 'transparent',
  fillOpacity: 0,
};

function MapView({ venues }) {
  const boundaries = useBoroughBoundaries();

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={11}
        className="map-container"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {boundaries && (
          <GeoJSON
            data={boundaries}
            style={boundaryStyle}
            onEachFeature={(feature, layer) => {
              if (feature.properties?.name) {
                layer.bindTooltip(feature.properties.name, {
                  sticky: true,
                  className: 'borough-tooltip',
                });
              }
            }}
          />
        )}
        {venues.map((venue) => (
          <CircleMarker
            key={venue.id}
            center={[venue.lat, venue.lng]}
            radius={6}
            pathOptions={{
              fillColor: venue.categoryColor,
              color: '#333',
              weight: 1,
              opacity: 0.8,
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <VenuePopup venue={venue} />
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      {venues.length === 0 && (
        <div className="map-empty-hint">
          Select a category above to explore venues on the map
        </div>
      )}
    </div>
  );
}

export default MapView;
