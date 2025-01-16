import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/AddVehiclePage.css"
const AddVehiclePage = () => {
  const [routes, setRoutes] = useState([]); // Stores routes fetched from API
  const [vehicleDetails, setVehicleDetails] = useState({
    registeration_number: "",
    capacity: "",
    route_id: "",
  });

  useEffect(() => {
    // Fetch route data from API when the component loads
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/route/get/");
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format data as per the backend requirement
    const formattedData = {
      registeration_number: vehicleDetails.registeration_number,
      capacity: Number(vehicleDetails.capacity),
      route: {
        id: Number(vehicleDetails.route_id),
      },
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/vehicle/add/", formattedData);
      alert("Vehicle added successfully!");
      console.log("Response:", response.data);
      // Reset form
      setVehicleDetails({ registeration_number: "", capacity: "", route_id: "" });
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("Failed to add vehicle. Please try again.");
    }
  };

  return (
    <div className="add-vehicle-container">
      <form onSubmit={handleSubmit} className="add-vehicle-form">
        <h2>Add Vehicle</h2>
        <input
          type="text"
          name="registeration_number"
          placeholder="Registration Number"
          value={vehicleDetails.registeration_number}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={vehicleDetails.capacity}
          onChange={handleInputChange}
          required
        />
        <select
          name="route_id"
          value={vehicleDetails.route_id}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Route
          </option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {`${route.start_location} → ${route.end_location}`}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddVehiclePage;
