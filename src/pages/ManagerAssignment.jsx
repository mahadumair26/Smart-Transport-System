import React, { useEffect, useState } from "react";
import { Select, MenuItem, Button, Card, Typography, TextField } from "@mui/material";
import "./style/ManagerAssignment.css";
import RouteMap from "../components/RouteMap.jsx";

const ManagerAssignment = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      const response = await fetch(`http://localhost:8000/${endpoint}`);
      const data = await response.json();
      setter(data);
    };

    fetchData("driver/get/", setDrivers);
    fetchData("vehicle/get/", setVehicles);
    fetchData("route/get/", setRoutes);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      driver_id: selectedDriver,
      vehicle_id: selectedVehicle,
      route_id: selectedRoute,
      start_time: startTime,
      end_time: endTime,
    };
    console.log(payload);
  };

  // Find the selected route details
  const selectedRouteDetails = routes.find((route) => route.id === selectedRoute);

  return (
    <div className="manager-assignment-container">
      <Typography variant="h4" gutterBottom>
        Manager Assignment
      </Typography>

      <div className="dropdowns">
        <div className="dropdown">
          <label>Select Driver:</label>
          <Select
            fullWidth
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <MenuItem value="">-- Select Driver --</MenuItem>
            {drivers.map((driver) => (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="dropdown">
          <label>Select Vehicle:</label>
          <Select
            fullWidth
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <MenuItem value="">-- Select Vehicle --</MenuItem>
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.registeration_number}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="dropdown">
          <label>Select Route:</label>
          <Select
            fullWidth
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <MenuItem value="">-- Select Route --</MenuItem>
            {routes.map((route) => (
              <MenuItem key={route.id} value={route.id}>
                {route.start_location} - {route.end_location}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="time-fields">
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ marginTop: "20px" }}
          />
          <TextField
            label="End Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ marginTop: "20px" }}
          />
        </div>
      </div>

      {/* Display the map only if a route is selected */}
      {selectedRouteDetails && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h5">Route Map</Typography>
          <RouteMap route={selectedRouteDetails} />
        </div>
      )}

      <Card className="summary-card" style={{ marginTop: "20px" }}>
        <Typography variant="h5">Assignment Summary</Typography>
        <Typography variant="body1">
          <strong>Driver:</strong>{" "}
          {selectedDriver ? drivers.find((d) => d.id === selectedDriver)?.name : "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Vehicle:</strong>{" "}
          {selectedVehicle
            ? vehicles.find((v) => v.id === selectedVehicle)?.registeration_number
            : "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Route:</strong>{" "}
          {selectedRouteDetails
            ? `${selectedRouteDetails.start_location} - ${selectedRouteDetails.end_location}`
            : "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Start Time:</strong> {startTime || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>End Time:</strong> {endTime || "N/A"}
        </Typography>
      </Card>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Create Assignment
      </Button>
    </div>
  );
};

export default ManagerAssignment;
