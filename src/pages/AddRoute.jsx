import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./style/AddRoute.css";

const AddRoute = () => {
  const [stops, setStops] = useState([]); // Stores stops fetched from API
  const [routeDetails, setRouteDetails] = useState({
    start_location: "",
    end_location: "",
    selectedStops: [], // Array of selected stop IDs
  });

  // Static edges data (routes between stops)
  const edges = [
    { from: 16, to: 1 },
    { from: 16, to: 9 },
    { from: 16, to: 5 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 8 },
    { from: 8, to: 15 },
    { from: 9, to: 10 },
    { from: 10, to: 13 },
    { from: 13, to: 14 },
    { from: 14, to: 8 },
    { from: 5, to: 11 },
    { from: 11, to: 12 },
    { from: 12, to: 13 },
    { from: 5, to: 6 },
    { from: 6, to: 7 },
    { from: 7, to: 13 },
    { from: 7, to: 12 },
  ];

  useEffect(() => {
    // Fetch stops data from API when the component loads
    const fetchStops = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/stops/get/");
        // Format stops for react-select
        const formattedStops = response.data.map((stop) => ({
          value: stop.id,
          label: stop.location_name,
        }));
        setStops(formattedStops);
      } catch (error) {
        console.error("Error fetching stops:", error);
      }
    };

    fetchStops();
  }, []);

  const handleStartLocationChange = (selectedOption) => {
    setRouteDetails((prev) => ({
      ...prev,
      start_location: selectedOption.label,
      end_location:
        selectedOption.label === "Iqra University Gulshan Campus"
          ? "Iqra University Gulshan Extension M9 campus"
          : "Iqra University Gulshan Campus",
    }));
  };

  const handleStopsChange = (selectedOption) => {
    const selectedStopId = selectedOption.value;

    // Update selectedStops and get the next stops based on the selected stop
    setRouteDetails((prev) => ({
      ...prev,
      selectedStops: [...prev.selectedStops, selectedStopId], // Add to selected stops
    }));
  };

  const getNextStops = (lastSelectedStopId) => {
    if (!lastSelectedStopId) return [];

    // Find all edges where the last selected stop is the "from" stop
    const nextStopIds = edges
      .filter((edge) => edge.from === lastSelectedStopId) // Filter edges where "from" matches the last selected stop
      .map((edge) => edge.to); // Extract the "to" stops

    // Filter the stops list to include only valid next stops
    return stops.filter((stop) => nextStopIds.includes(stop.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the payload
    const formattedData = {
      start_location: routeDetails.start_location,
      end_location: routeDetails.end_location,
      distance_km: 0.0, // Default to 0.00
      estimated_time: "0:00:00", // Default to 0.00
      cost_per_km: 0.0, // Default to 0.00
      stops: routeDetails.selectedStops,
    };

    try {
      console.log(formattedData);
      const response = await axios.post(
        "http://127.0.0.1:8000/route/add/",
        formattedData
      );
      alert("Route added successfully!");
      console.log("Response:", response.data);

      // Reset form
      setRouteDetails({
        start_location: "",
        end_location: "",
        selectedStops: [],
      });
    } catch (error) {
      console.error("Error adding route:", error);
      alert("Failed to add route. Please try again.");
    }
  };

  return (
    <div className="add-route-container">
      <form onSubmit={handleSubmit} className="add-route-form">
        <h2>Add Route</h2>

        {/* Start Location Selector */}
        <Select
          options={[
            {
              value: "Iqra University Gulshan Campus",
              label: "Iqra University Gulshan Campus",
            },
            {
              value: "Iqra University Gulshan Extension M9 campus",
              label: "Iqra University Gulshan Extension M9 campus",
            },
          ]}
          onChange={handleStartLocationChange}
          placeholder="Select Start Location"
          className="start-location-select"
        />

        <input
          type="text"
          name="end_location"
          value={routeDetails.end_location}
          readOnly
          placeholder="End Location"
        />

        {/* Stops Selector */}
        <div className="stops-container">
          <h3>Select Stops</h3>

          {/* Render dynamic dropdowns for selected stops */}
          {routeDetails.selectedStops.map((stopId, index) => {
            const nextStops = getNextStops(stopId); // Get the next valid stops for this stop
            return (
              <div key={index} className="next-stops-dropdown">
                <h4>
                  {`Next Stops After ${
                    stops.find((s) => s.value === stopId)?.label || ""
                  }`}
                </h4>
                {nextStops.length > 0 ? (
                  <Select
                    options={nextStops}
                    onChange={handleStopsChange}
                    placeholder="Select Next Stop"
                  />
                ) : (
                  <p>No further stops available.</p>
                )}
              </div>
            );
          })}

          {/* Initial dropdown for the first stop */}
          {routeDetails.selectedStops.length === 0 && (
            <Select
              options={stops}
              onChange={handleStopsChange}
              placeholder="Select Starting Stop"
            />
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRoute;
