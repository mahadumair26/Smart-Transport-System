import React, { useState } from "react";
import { TextField, Button, Typography, Card } from "@mui/material";
import axios from "axios";
import "./style/AddDriver.css";

const AddDriver = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  // Added email state
  const [licenseNo, setLicenseNo] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");  // Added password state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !licenseNo || !contactNo || !password) {
      setError("All fields are required.");
      return;
    }

    const driverData = {
      name,
      email,
      license_no: licenseNo,
      contact_no: contactNo,
      password,
    };

    console.log("Sending data:", driverData);  // Log the data before sending

    try {
      const response = await axios.post("http://localhost:8000/driver/add/", driverData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setSuccess("Driver added successfully!");
        setName("");
        setEmail("");  // Clear email field
        setLicenseNo("");
        setContactNo("");
        setPassword("");  // Clear the password field
      } else {
        setError(response.data.message || "Failed to add driver.");
      }
    } catch (error) {
      setError("An error occurred while adding the driver.");
    }
  };

  return (
    <div className="add-driver-container">
      <Typography variant="h4" gutterBottom>
        Add New Driver
      </Typography>

      <Card className="form-card">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ maxLength: 100, minLength: 1 }}
            required
            style={{ marginBottom: "20px" }}
          />

          <TextField
            label="Email"
            type="email"  // Ensure it's an email input
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "20px" }}
          />

          <TextField
            label="License Number"
            fullWidth
            value={licenseNo}
            onChange={(e) => setLicenseNo(e.target.value)}
            inputProps={{ maxLength: 100, minLength: 1 }}
            required
            style={{ marginBottom: "20px" }}
          />

          <TextField
            label="Contact Number"
            fullWidth
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            inputProps={{ maxLength: 15, minLength: 1 }}
            required
            style={{ marginBottom: "20px" }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ minLength: 6 }}
            required
            style={{ marginBottom: "20px" }}
          />

          {error && (
            <Typography variant="body1" color="error" style={{ marginBottom: "10px" }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography variant="body1" color="primary" style={{ marginBottom: "10px" }}>
              {success}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Driver
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddDriver;
