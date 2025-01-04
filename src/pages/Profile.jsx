import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userInfo);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container text-center my-5">
        <h3 className="text-danger">Error</h3>
        <p>Unable to load profile data. Please try again later.</p>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center">Your Profile</h1>
      <hr />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg">
            <div className="card-header bg-dark text-white text-center">
              <h4>{`${user.firstName} ${user.lastName}`}</h4>
              <p className="text-muted">{user.email}</p>
            </div>
            <div className="card-body text-center">
              <div  className="d-flex justify-content-center">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="rounded-circle mb-3"
                    width="120"
                    height="120"
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mb-3"
                    style={{ width: "120px", height: "120px" }}
                  >
                    <i className="fa fa-user fa-3x"></i>
                  </div>
                )}
              </div>
              <ul className="list-group list-group-flush text-left">
              <li className="list-group-item">
                  <strong>Email: </strong>
                  {user.email || "Not Provided"}
                </li>
                <li className="list-group-item">
                  <strong>Contact Number: </strong>
                  {user.contact_no || "Not Provided"}
                </li>
                <li className="list-group-item">
                  <strong>Date of Birth: </strong>
                  {user.dob || "Not Provided"}
                </li>
                <li className="list-group-item">
                  <strong>Status: </strong>
                  <span
                    className={`badge ${
                      user.status === "accepted"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {user.status}
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>Joined On: </strong>
                  {user.createdDate}
                </li>
                <li className="list-group-item">
                  <strong>Address </strong>
                  {user?.location?.address || "Not Provided"}
                </li>
                <li className="list-group-item">
                  <strong>Country: </strong>
                  {user?.location?.country || "Not Provided"}
                </li>
                <li className="list-group-item">
                  <strong>City: </strong>
                  {user?.location?.city || "Not Provided"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
