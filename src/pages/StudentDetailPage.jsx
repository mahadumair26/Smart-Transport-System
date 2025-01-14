import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentsListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = "http://localhost:8000"; // Base URL for image paths

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/student/students");
        setStudents(response.data); // Set the entire student data to state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        alert("Failed to load student data.");
      }
    };

    fetchStudentsData();
  }, []);

  const Loading = () => (
    <div className="container my-5 text-center">
      <h3>Loading...</h3>
    </div>
  );

  if (loading) return <Loading />;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Students List</h2>
      <div className="list-group">
        {students.map(student => (
          <div key={student.id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3">
            <div className="d-flex align-items-center">
              <img
                src={student.photo ? `${baseUrl}${student.photo}` : "/path/to/default/photo.jpg"}
                alt="Student"
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <div>
                <h5 className="mb-1">{student.name}</h5>
                <p className="mb-1"><strong>Father's Name:</strong> {student.father_name}</p>
                <p className="mb-1"><strong>Email:</strong> {student.email}</p>
                <p className="mb-1"><strong>Program:</strong> {student.program}</p>
                <p className="mb-1"><strong>Semester:</strong> {student.semester}</p>
                <p className="mb-1"><strong>Status:</strong> {student.status}</p>
              </div>
            </div>
            <div>
              <a href={`/student/${student.id}`} className="btn btn-primary">View Details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsListPage;
