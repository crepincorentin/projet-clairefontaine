'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

const createCustomIcon = (color) => {
  const markerSvg = ReactDOMServer.renderToString(
    <svg viewBox="0 0 32 52" width="28" height="46" style={{ overflow: 'visible' }}>
      <path
        d="M16 0C7.163 0 0 7.163 0 16c0 12.422 16 36 16 36s16-23.578 16-36C32 7.163 24.837 0 16 0Z"
        fill={color}
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="16" cy="16" r="7" fill="#fff" />
    </svg>,
  );
  return L.divIcon({
    html: markerSvg,
    className: 'custom-leaflet-icon',
    iconSize: [28, 46],
    iconAnchor: [14, 46],
    popupAnchor: [0, -46],
  });
};

function FitBounds({ locations }) {
  const map = useMap();
  if (locations && locations.length > 0) {
    const bounds = L.latLngBounds(locations.map((loc) => loc.coords));
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
}

export default function InteractiveMap({ locations }) {
  const initialCenter = locations.length > 0 ? locations[0].coords : [50.85, 2.5];

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds locations={locations} />

      {locations.map((location) => (
        <Marker
          key={location.name}
          position={location.coords}
          icon={createCustomIcon(location.theme.primary)}
        >
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.address}
            <br />
            <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
              Voir sur Google Maps
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}