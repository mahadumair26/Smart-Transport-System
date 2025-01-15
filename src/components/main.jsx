import React from "react";
import "./style/home.css"; // Add this file for additional styling
import stdimage from "./assets/freepik__comic-art-graphic-novel-art-comic-illustration-hig__60726.jpg";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="card bg-dark text-white border-0">
          <img
            className="card-img img-fluid"
            src={stdimage}
            alt="Smart Transport"
            style={{ height: "600px", objectFit: "cover", opacity: "0.8" }}
          />
          <div className="card-img-overlay d-flex align-items-center justify-content-center">
            <div className="hero-text text-center">
              <h1 className="display-4 fw-bold text-uppercase">
                Smart Transport Management System
              </h1>
              <p className="lead mb-4">
                Effortless travel management with real-time tracking, route
                planning, and seamless ride booking. Your journey, redefined.
              </p>
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary btn-lg mx-2 shadow-sm">
                  Book a Ride
                </button>
                <button className="btn btn-outline-light btn-lg mx-2 shadow-sm">
                  View Routes
                </button>
                <button className="btn btn-success btn-lg mx-2 shadow-sm">
                  Check Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container features-section py-5">
        <h2 className="text-center fw-bold mb-5">Features</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <img
              src="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMHRpbWUlMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Real-Time Tracking"
              className="img-fluid feature-icon mb-3"
            />
            <h4 className="fw-bold">Real-Time Tracking</h4>
            <p className="text-muted">
              Track your rides and vehicles in real-time for efficient travel
              planning.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <img
              src="https://images.unsplash.com/photo-1594935975218-a3596da034a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Route Planning"
              className="img-fluid feature-icon mb-3"
            />
            <h4 className="fw-bold">Route Planning</h4>
            <p className="text-muted">
              Optimize routes for faster and more reliable travel.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <img
              src="https://media.istockphoto.com/id/2184007801/photo/happy-generation-z-girls-tavelling-in-zhuhai-greater-bay-area-china-they-are-using-a-ride.webp?a=1&b=1&s=612x612&w=0&k=20&c=31tdoDOA-_hTiVuP6EwGbV5TlANRWdw7S8KFqqZ8GAI="
              alt="Ride Booking"
              className="img-fluid feature-icon mb-3"
            />
            <h4 className="fw-bold">Ride Booking</h4>
            <p className="text-muted">
              Seamlessly book your rides anytime, anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section bg-light py-5">
        <div className="container text-center">
          <h3 className="fw-bold">Ready to start your journey?</h3>
          <p className="text-muted mb-4">
            Sign up now and experience the future of transportation!
          </p>
          <button className="btn btn-primary btn-lg shadow-sm">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
