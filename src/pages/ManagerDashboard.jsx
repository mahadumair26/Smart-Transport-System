import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const [showAddDriverForm, setShowAddDriverForm] = useState(false); // Toggle form visibility
  const [driverDetails, setDriverDetails] = useState({
    name: "",
    contact: "",
    route: "",
    license: "",
  });
  const navigate = useNavigate(); // hook to navigate between pages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDriver = (e) => {
    e.preventDefault();
    console.log("Driver Details:", driverDetails);
    // Add API call here to save driver data
    alert("Driver added successfully!");
    setShowAddDriverForm(false);
    setDriverDetails({ name: "", contact: "", route: "", license: "" }); // Reset form
  };

  const renderAddDriverForm = () => (
    <form
      onSubmit={handleAddDriver}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        maxWidth: "500px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        margin: "20px auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Driver</h2>
      <input
        type="text"
        name="name"
        placeholder="Driver Name"
        value={driverDetails.name}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={driverDetails.contact}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="route"
        placeholder="Route"
        value={driverDetails.route}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="license"
        placeholder="License Number"
        value={driverDetails.license}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
      <button
        type="button"
        onClick={() => setShowAddDriverForm(false)}
        style={{ ...buttonStyle, backgroundColor: "#ff4d4d", marginTop: "10px" }}
      >
        Cancel
      </button>
    </form>
  );

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJ1c2luZXNzfGVufDB8fDB8fHwy')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
        textShadow: "0px 2px 5px rgba(0, 0, 0, 0.7)",
      }}
    >
      {showAddDriverForm ? (
        renderAddDriverForm()
      ) : (
        <>
          <h1 style={{ fontSize: "3rem", marginBottom: "30px" }}>Manager Dashboard</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              width: "80%",
              maxWidth: "800px",
            }}
          >
            <button
              style={buttonStyle}
              onClick={() => navigate("/studentDetailPage")}
            >
              View Students
            </button>
            <button
              style={buttonStyle}
              onClick={() => setShowAddDriverForm(true)}
            >
              Add Driver
            </button>
            <button
              style={buttonStyle}
              onClick={() => alert("Add Vehicle clicked")}
            >
              Add Vehicle
            </button>
            <button
              style={buttonStyle}
              onClick={() => navigate("/RouteManagement")}
            >
              Assign Route
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "15px 20px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  backgroundColor: "rgba(0, 123, 255, 0.8)",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textAlign: "center",
};

const inputStyle = {
  padding: "10px",
  margin: "10px 0",
  fontSize: "1rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
  outline: "none",
};

export default ManagerDashboard;
