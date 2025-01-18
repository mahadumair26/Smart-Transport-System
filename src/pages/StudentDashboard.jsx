import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/StudentDashboard.css";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const StudentDashboard = () => {
  const studentData = JSON.parse(localStorage.getItem("user"));
  const driverData = studentData?.driver;
  const vehicleData = driverData?.vehicle;
  const stops = vehicleData?.route?.stops;

  return (
    <div className="student-dashboard bg-light">
      <div className="container py-5">
        <h1 className="text-center mb-5 text-primary">Student Dashboard</h1>
        <div className="row">
          {/* Profile Section */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3>Profile</h3>
              </div>
              <div className="card-body">
                <p><strong>Name:</strong> {studentData?.name || "N/A"}</p>
                <p><strong>Father's Name:</strong> {studentData?.father_name || "N/A"}</p>
                <p><strong>Email:</strong> {studentData?.email || "N/A"}</p>
                <p><strong>Phone Number:</strong> {studentData?.phone_number || "N/A"}</p>
                <p><strong>Address:</strong> {studentData?.address || "N/A"}</p>
                <p><strong>CNIC:</strong> {studentData?.cnic || "N/A"}</p>
                <p><strong>Semester:</strong> {studentData?.semester || "N/A"}</p>
                <p><strong>Program:</strong> {studentData?.program || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Fees Section */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                <h3>Fees</h3>
              </div>
              <div className="card-body">
                <p><strong>Pick-Up Location:</strong> {studentData?.pick_up_location || "N/A"}</p>
                <p><strong>Drop-Up Location:</strong> {studentData?.drop_up_location || "N/A"}</p>
                <p><strong>Pick-Up Time:</strong> {studentData?.pick_up_time || "N/A"}</p>
                <p><strong>Status:</strong> {studentData?.status || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Driver Information */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h3>Driver Information</h3>
              </div>
              <div className="card-body">
                {driverData ? (
                  <>
                    <p><strong>Name:</strong> {driverData.name}</p>
                    <p><strong>License Number:</strong> {driverData.license_no}</p>
                    <p><strong>Contact Number:</strong> {driverData.contact_no}</p>
                  </>
                ) : (
                  <p>No driver information available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Vehicle and Route Information */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h3>Vehicle and Route Information</h3>
              </div>
              <div className="card-body">
                {vehicleData ? (
                  <>
                    <p><strong>Registration Number:</strong> {vehicleData.registeration_number}</p>
                    <p><strong>Capacity:</strong> {vehicleData.capacity} passengers</p>
                    <h5 className="mt-3">Route Details</h5>
                    <p><strong>Start Location:</strong> {vehicleData.route.start_location}</p>
                    <p><strong>End Location:</strong> {vehicleData.route.end_location}</p>
                    <p><strong>Distance:</strong> {vehicleData.route.distance_km} km</p>
                    <p><strong>Estimated Time:</strong> {vehicleData.route.estimated_time} minutes</p>
                  </>
                ) : (
                  <p>No vehicle information available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-warning text-white">
                <h3>Route Map</h3>
              </div>
              <div className="card-body">
                {stops && stops.length > 0 ? (
                  <MapContainer
                    center={[stops[0].latitude, stops[0].longitude]}
                    zoom={13}
                    style={{ height: "500px", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {stops.map((stop, index) => (
                      <Marker key={index} position={[stop.latitude, stop.longitude]}>
                        <Popup>
                          <strong>{stop.location_name}</strong>
                          <br />
                          Lat: {stop.latitude}, Long: {stop.longitude}
                        </Popup>
                      </Marker>
                    ))}
                    <Polyline
                      positions={stops.map((stop) => [stop.latitude, stop.longitude])}
                      color="blue"
                      weight={4}
                      opacity={0.7}
                    />
                  </MapContainer>
                ) : (
                  <p>No stops information available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
