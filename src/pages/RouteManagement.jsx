import React, { useState, useEffect } from "react";
import { Footer } from "../components";

const RouteManagement = () => {
  const [vehicleInfo, setVehicleInfo] = useState({
    vehicleNumber: "",
    model: "",
    capacity: "",
  });
  const [routeInfo, setRouteInfo] = useState({
    startPoint: "",
    endPoint: "",
    stops: [],
  });
  const [numberOfStops, setNumberOfStops] = useState(0);
  const [stopOptions, setStopOptions] = useState([]); // For stops fetched from DB
  const [driverInfo, setDriverInfo] = useState({
    driverName: "",
    licenseNumber: "",
  });
  const [predictions, setPredictions] = useState({
    cost: "Pending AI Calculation",
    time: "Pending AI Calculation",
    fuel: "Pending AI Calculation",
  });

  useEffect(() => {
    // Simulate fetching stops from the database
    setStopOptions([
      "Stop 1",
      "Stop 2",
      "Stop 3",
      "Stop 4",
      "Stop 5",
    ]);
  }, []);

  const handleVehicleChange = (e) => {
    setVehicleInfo({ ...vehicleInfo, [e.target.name]: e.target.value });
  };

  const handleRouteChange = (e) => {
    setRouteInfo({ ...routeInfo, [e.target.name]: e.target.value });
  };

  const handleDriverChange = (e) => {
    setDriverInfo({ ...driverInfo, [e.target.name]: e.target.value });
  };

  const handleStopChange = (index, value) => {
    const updatedStops = [...routeInfo.stops];
    updatedStops[index] = value;
    setRouteInfo({ ...routeInfo, stops: updatedStops });
  };

  const handlePredict = () => {
    setPredictions({
      cost: "$50",
      time: "45 minutes",
      fuel: "5 liters",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for saving vehicle, route, and driver info to the backend
    alert("Vehicle and Route details saved successfully!");
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Vehicle and Route Management</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          {/* Vehicle Information Section */}
          <div className="card mb-4">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Vehicle Information</h5>
            </div>
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Vehicle Number"
                name="vehicleNumber"
                value={vehicleInfo.vehicleNumber}
                onChange={handleVehicleChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Vehicle Model"
                name="model"
                value={vehicleInfo.model}
                onChange={handleVehicleChange}
              />
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Capacity"
                name="capacity"
                value={vehicleInfo.capacity}
                onChange={handleVehicleChange}
              />
            </div>
          </div>

          {/* Route Information Section */}
          <div className="card mb-4">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Route Details</h5>
            </div>
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Starting Point"
                name="startPoint"
                value={routeInfo.startPoint}
                onChange={handleRouteChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Ending Point"
                name="endPoint"
                value={routeInfo.endPoint}
                onChange={handleRouteChange}
              />
              <label htmlFor="numberOfStops" className="form-label">
                Number of Stops
              </label>
              <input
                type="number"
                id="numberOfStops"
                className="form-control mb-3"
                value={numberOfStops}
                onChange={(e) => {
                  setNumberOfStops(Number(e.target.value));
                  setRouteInfo({
                    ...routeInfo,
                    stops: Array(Number(e.target.value)).fill(""),
                  });
                }}
              />
              {routeInfo.stops.map((stop, index) => (
                <div key={index} className="mb-3">
                  <label htmlFor={`stop-${index}`} className="form-label">
                    Stop {index + 1}
                  </label>
                  <select
                    id={`stop-${index}`}
                    className="form-control"
                    value={stop}
                    onChange={(e) => handleStopChange(index, e.target.value)}
                  >
                    <option value="">Select Stop</option>
                    {stopOptions.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Driver Information Section */}
          <div className="card mb-4">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Driver Information</h5>
            </div>
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Driver Name"
                name="driverName"
                value={driverInfo.driverName}
                onChange={handleDriverChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="License Number"
                name="licenseNumber"
                value={driverInfo.licenseNumber}
                onChange={handleDriverChange}
              />
            </div>
          </div>

          {/* AI Prediction Section */}
          <div className="card mb-4">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">AI Predictions</h5>
            </div>
            <div className="card-body">
              <p>Predicted Cost: {predictions.cost}</p>
              <p>Predicted Time: {predictions.time}</p>
              <p>Predicted Fuel Consumption: {predictions.fuel}</p>
              <button type="button" className="btn btn-dark" onClick={handlePredict}>
                Predict
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Save Details
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RouteManagement;
