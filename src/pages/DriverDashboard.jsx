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
        // Mock driver info
        const mockDriverInfo = {
          name: "John Doe",
          routeName: "Route 15",
          contact: "123-456-7890",
        };
        setDriverInfo(mockDriverInfo);

        // Mock student data
        const mockStudents = [
          { id: 1, name: "Alice Johnson", className: "5th Grade", contact: "555-1234" },
          { id: 2, name: "Bob Smith", className: "6th Grade", contact: "555-5678" },
          { id: 3, name: "Charlie Brown", className: "7th Grade", contact: "555-8765" },
        ];
        setStudents(mockStudents);

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
