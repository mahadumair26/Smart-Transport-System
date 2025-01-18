import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentDetailPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/student/students");
        setStudents(response.data);
        setLoading(false);
        prepareChartData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        alert("Failed to load student data.");
      }
    };

    const prepareChartData = (data) => {
      const programCounts = data.reduce((acc, student) => {
        acc[student.program] = (acc[student.program] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(programCounts),
        datasets: [
          {
            label: "Number of Students by Program",
            data: Object.values(programCounts),
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchStudentsData();
  }, []); // Empty dependency array ensures it runs once when the component is mounted

  const toggleChart = () => {
    setShowChart((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <h3 className="text-muted">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary fw-bold">Students List</h2>

      <div className="text-center mb-5">
        <button
          className="btn btn-primary btn-lg shadow"
          onClick={toggleChart}
          style={{ width: "200px", borderRadius: "25px" }}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      </div>

      {showChart && (
        <div className="my-5">
          <h4 className="text-center mb-4 text-secondary">Student Data Visualization</h4>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "#4b4b4b",
                  },
                },
                title: {
                  display: true,
                  text: "Number of Students by Program",
                  color: "#333",
                  font: {
                    size: 18,
                    weight: "bold",
                  },
                },
              },
            }}
          />
        </div>
      )}

      <div className="row">
        {students.map((student) => (
          <div key={student.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <img
                  src={student.photo ? `http://localhost:8000${student.photo}` : "/path/to/default/photo.jpg"}
                  alt="Student"
                  className="rounded-circle mb-3"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    border: "2px solid #007bff",
                  }}
                />
                <h5 className="card-title text-primary fw-bold">{student.name}</h5>
                <p className="text-muted mb-1">
                  <strong>Father's Name:</strong> {student.father_name}
                </p>
                <p className="text-muted mb-1">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-muted mb-1">
                  <strong>Program:</strong> {student.program}
                </p>
                <p className="text-muted mb-1">
                  <strong>Semester:</strong> {student.semester}
                </p>
                <p className="text-muted mb-3">
                  <strong>Status:</strong>
                  <span className={`badge ${student.status === "Active" ? "bg-success" : "bg-danger"}`}>
                    {student.status}
                  </span>
                </p>
                <a
                  href={`/student/${student.id}`}
                  className="btn btn-outline-primary btn-sm rounded-pill"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetailPage;
