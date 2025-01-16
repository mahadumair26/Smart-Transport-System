import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for marker icon issue in React Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Map Component
const RouteMap = ({ route }) => {
  if (!route || !route.stops) {
    return <p>Loading map data...</p>; // Fallback for undefined route or stops
  }

  const {
    startLocationlatitude,
    startLocationlongitude,
    endLocationlatitude,
    endLocationlongitude,
    stops,
  } = route;

  // Extract route coordinates for the polyline
  const routeCoordinates = [
    [startLocationlatitude, startLocationlongitude],
    ...stops.map((stop) => [parseFloat(stop.latitude), parseFloat(stop.longitude)]),
    [endLocationlatitude, endLocationlongitude],
  ];

  return (
    <div style={{ height: "500px", width: "100%", margin: "20px auto" }}>
      <MapContainer
        center={[startLocationlatitude, startLocationlongitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Markers for Stops */}
        {stops.map((stop) => (
          <Marker
            key={stop.id}
            position={[parseFloat(stop.latitude), parseFloat(stop.longitude)]}
          >
            <Popup>{stop.location_name}</Popup>
          </Marker>
        ))}

        {/* Start and End Markers */}
        <Marker position={[startLocationlatitude, startLocationlongitude]}>
          <Popup>Start Location</Popup>
        </Marker>
        <Marker position={[endLocationlatitude, endLocationlongitude]}>
          <Popup>End Location</Popup>
        </Marker>

        {/* Route Polyline */}
        <Polyline
          positions={routeCoordinates}
          color="blue"
          weight={4}
          opacity={0.8}
        />
      </MapContainer>
    </div>
  );
};

export default RouteMap;
