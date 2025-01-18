import React, { useState, useEffect } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    email: "",
    phone_number: "",
    address: "",
    cnic: "",
    semester: "",
    program: "",
    password: "",
    pick_up_time: "",
    pick_up_location: "",
    drop_up_location: "",
    uni_id_card: null,
    photo: null,
  });

  const [stops, setStops] = useState([]);

  useEffect(() => {
    // Fetch stops from the API on component mount
    const fetchStops = async () => {
      try {
        const response = await axios.get("http://localhost:8000/stops/get/");
        setStops(response.data);
      } catch (error) {
        console.error("Error fetching stops:", error);
      }
    };

    fetchStops();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission (including the image files)
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Send request to backend
    try {
      const response = await axios.post("http://127.0.0.1:8000/student/students/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from backend:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Student Signup</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="father_name"
          placeholder="Father's Name"
          value={formData.father_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={{ ...inputStyle, height: "80px" }}
        />
        <input
          type="text"
          name="cnic"
          placeholder="CNIC"
          value={formData.cnic}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="program"
          placeholder="Program"
          value={formData.program}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="time"
          name="pick_up_time"
          placeholder="Pick-up Time"
          value={formData.pick_up_time}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <select
          name="pick_up_location"
          value={formData.pick_up_location}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Pick-up Location</option>
          {stops.map((stop) => (
            <option key={stop.id} value={stop.location_name}>
              {stop.location_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="drop_up_location"
          placeholder="Drop-up Location"
          value={formData.drop_up_location}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <div>
          <label style={labelStyle}>Upload University ID Card:</label>
          <input
            type="file"
            name="uni_id_card"
            onChange={handleFileChange}
            required
            style={fileInputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Upload Photo:</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            required
            style={fileInputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const fileInputStyle = {
  marginTop: "5px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Register;
