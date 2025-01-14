import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { Footer } from "../components";

const DriverDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverInfo, setDriverInfo] = useState({});

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        // Get the user data from localStorage
        const storedData = JSON.parse(localStorage.getItem("user"));
        const user = storedData ? storedData.user : null;

        if (!user || user.role !== "Driver") {
          alert("Unauthorized access. Redirecting...");
          return; // Handle unauthorized access
        }

        // Fetch Driver Info using the user.id
        const driverResponse = await axios.get(`http://localhost:8000/driver/get/${user.id}`);
        setDriverInfo(driverResponse.data);

        // Fetch Assigned Students
        const studentsResponse = await axios.get(`http://localhost:8000/api/driver/${user.id}/students`);
        setStudents(studentsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching driver data:", error);
        alert("Failed to load dashboard data.");
      }
    };

    fetchDriverData();
}, []);



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
              <th>Class</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.contact}</td>
                <td>
                  <Link to={`/student/${student.id}`} className="btn btn-primary btn-sm">
                    View Student
                  </Link>
                </td>
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
