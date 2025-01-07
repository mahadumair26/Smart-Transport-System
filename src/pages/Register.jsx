import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    address: "",
    phoneNumber: "",
    cnicImage: null,
    class: "",
    section: "",
    universityIdCard: null,
    pickTiming: "",
    dropTiming: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
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
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
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
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <div>
          <label style={labelStyle}>Upload CNIC Image:</label>
          <input
            type="file"
            name="cnicImage"
            onChange={handleFileChange}
            required
            style={fileInputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Class:</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="" disabled>
              Select Your Class
            </option>
            <option value="1 Year">1 Year</option>
            <option value="2 Year">2 Year</option>
            <option value="3 Year">3 Year</option>
            <option value="4 Year">4 Year</option>
            <option value="Master">Master</option>
          </select>
        </div>
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <div>
          <label style={labelStyle}>Upload University ID Card:</label>
          <input
            type="file"
            name="universityIdCard"
            onChange={handleFileChange}
            required
            style={fileInputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Pick Timing:</label>
          <select
            name="pickTiming"
            value={formData.pickTiming}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="" disabled>
              Select Pick Timing
            </option>
            <option value="7:00 AM">7:00 AM</option>
            <option value="8:00 AM">8:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Drop Timing:</label>
          <select
            name="dropTiming"
            value={formData.dropTiming}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="" disabled>
              Select Drop Timing
            </option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
          </select>
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
