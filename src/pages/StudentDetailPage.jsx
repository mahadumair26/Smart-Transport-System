import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentsListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [showChart, setShowChart] = useState(false); // State to toggle chart visibility

  const baseUrl = "http://localhost:8000"; // Base URL for image paths

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/student/students");
        setStudents(response.data);
        setLoading(false);
        prepareChartData(response.data); // Prepare chart data after fetching
      } catch (error) {
        console.error("Error fetching student data:", error);
        alert("Failed to load student data.");
      }
    };

    const prepareChartData = (data) => {
      // Group students by program
      const programCounts = data.reduce((acc, student) => {
        acc[student.program] = (acc[student.program] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(programCounts), // Program names
        datasets: [
          {
            label: "Number of Students by Program",
            data: Object.values(programCounts), // Count of students
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
  }, []);

  const toggleChart = () => {
    setShowChart((prev) => !prev);
  };

  const Loading = () => (
    <div className="container my-5 text-center">
      <h3>Loading...</h3>
    </div>
  );

  if (loading) return <Loading />;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Students List</h2>

      {/* Toggle Button for Chart */}
      <div className="text-center mb-5">
        <button
          className="btn btn-outline-primary"
          onClick={toggleChart}
          style={{ width: "200px" }}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      </div>

      {/* Chart Section */}
      {showChart && (
        <div className="my-5">
          <h4 className="text-center mb-4">Student Data Visualization</h4>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Number of Students by Program",
                },
              },
            }}
          />
        </div>
      )}

      {/* Students List */}
      <div className="list-group">
        {students.map((student) => (
          <div
            key={student.id}
            className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3"
          >
            <div className="d-flex align-items-center">
              <img
                src={
                  student.photo
                    ? `${baseUrl}${student.photo}`
                    : "/path/to/default/photo.jpg"
                }
                alt="Student"
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <div>
                <h5 className="mb-1">{student.name}</h5>
                <p className="mb-1">
                  <strong>Father's Name:</strong> {student.father_name}
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="mb-1">
                  <strong>Program:</strong> {student.program}
                </p>
                <p className="mb-1">
                  <strong>Semester:</strong> {student.semester}
                </p>
                <p className="mb-1">
                  <strong>Status:</strong> {student.status}
                </p>
              </div>
            </div>
            <div>
              <a href={`/student/${student.id}`} className="btn btn-primary">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsListPage;
