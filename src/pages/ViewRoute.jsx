import React, { useEffect, useState } from "react";
import "./style/ViewRoute.css";

const ViewRoute = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("http://localhost:8000/route/get/");
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="view-routes-container">
      <h1>Available Routes</h1>
      {routes.length === 0 ? (
        <p>Loading routes...</p>
      ) : (
        <div className="routes-grid">
          {routes.map((route) => (
            <div key={route.id} className="route-card">
              <h2>Route {route.id}</h2>
              <p><strong>Start:</strong> {route.start_location}</p>
              <p><strong>End:</strong> {route.end_location}</p>
              <p><strong>Distance:</strong> {route.distance_km} km</p>
              <p><strong>Estimated Time:</strong> {route.estimated_time} minutes</p>
              <p><strong>Cost per km:</strong> {route.cost_per_km} PKR</p>
              <div className="stops">
                <h3>Stops:</h3>
                <ul>
                  {route.stops.map((stop) => (
                    <li key={stop.id}>{stop.location_name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewRoute;
