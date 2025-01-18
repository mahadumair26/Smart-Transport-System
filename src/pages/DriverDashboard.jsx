import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { Footer } from "../components";

const DriverDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverInfo, setDriverInfo] = useState({});
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        // Get the driverId from localStorage
        const driverId = JSON.parse(localStorage.getItem("userId"));
        console.log(driverId);
        

        if (!driverId) {
          setError("No driver ID found. Please log in again.");
          setLoading(false);
          return; // Handle missing driver ID
        }

        // Fetch Driver Info using the stored driverId
        const driverResponse = await axios.get(`http://localhost:8000/driver/get/${driverId}`);
        setDriverInfo(driverResponse.data);

        // Fetch Assigned Students for this driver
        const studentsResponse = await axios.get(`http://localhost:8000/driver/get_students/${driverId}/`);
        setStudents(studentsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching driver data:", error);
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    fetchDriverData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const Loading = () => (
    <div className="container my-5">
      <Skeleton count={6} height={50} />
    </div>
  );

  const ShowStudents = () => (
    <div className="container my-5">
      <h2 className="mb-4">Assigned Students</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Pick-Up Location</th>
              <th>Pick-Up Time</th>
              <th>Drop-Off Location</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.father_name}</td>
                <td>{student.email}</td>
                <td>{student.phone_number}</td>
                <td>{student.pick_up_location}</td>
                <td>{student.pick_up_time}</td>
                <td>{student.drop_up_location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ShowDriverInfo = () => (
    <div className="container my-5">
      <h2 className="mb-4">Driver Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name: {driverInfo.name}</h5>
          <p className="card-text">
            <strong>Route:</strong> {driverInfo.routeName}
          </p>
          <p className="card-text">
            <strong>Contact:</strong> {driverInfo.contact}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center mb-4">Driver Dashboard</h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="alert alert-danger">{error}</div> // Show error message if any
        ) : (
          <>
            <ShowDriverInfo />
            <ShowStudents />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DriverDashboard;
