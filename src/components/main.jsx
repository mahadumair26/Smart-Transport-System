import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://media.istockphoto.com/id/1255615659/photo/man-reading-a-book.webp?a=1&b=1&s=612x612&w=0&k=20&c=PZF7iixHtxJ68eq7YbfVlg8jbx0xtqWWC6-OSqWKQ98=" // Replace with a relevant image
            alt="Smart Transport"
            height={500}
            style={{ height: "600px" }}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container text-center">
              <h1 className="card-title fs-1 text fw-bold">
                Smart Transport Management System
              </h1>
              <p className="card-text fs-5 d-none d-sm-block">
                Effortless travel management with real-time tracking, route planning, and seamless ride booking. Your journey, redefined.
              </p>
              <div className="mt-4">
                <button className="btn btn-primary btn-lg mx-2">
                  Book a Ride
                </button>
                <button className="btn btn-outline-light btn-lg mx-2">
                  View Routes
                </button>
                <button className="btn btn-success btn-lg mx-2">
                  Check Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Features</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMHRpbWUlMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D" // Replace with an icon or image
              alt="Real-Time Tracking"
              className="img-fluid mb-3"
              style={{ height: "200px" }}
            />
            <h4>Real-Time Tracking</h4>
            <p>Track your rides and vehicles in real-time for efficient travel planning.</p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="https://images.unsplash.com/photo-1594935975218-a3596da034a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with an icon or image
              alt="Route Planning"
              className="img-fluid mb-3"
              style={{ height: "200px" }}
            />
            <h4>Route Planning</h4>
            <p>Optimize routes for faster and more reliable travel.</p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="https://media.istockphoto.com/id/2184007801/photo/happy-generation-z-girls-tavelling-in-zhuhai-greater-bay-area-china-they-are-using-a-ride.webp?a=1&b=1&s=612x612&w=0&k=20&c=31tdoDOA-_hTiVuP6EwGbV5TlANRWdw7S8KFqqZ8GAI=" // Replace with an icon or image
              alt="Ride Booking"
              className="img-fluid mb-3"
              style={{ height: "200px" }}
            />
            <h4>Ride Booking</h4>
            <p>Seamlessly book your rides anytime, anywhere.</p>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container text-center">
          <h3>Ready to start your journey?</h3>
          <p>Sign up now and experience the future of transportation!</p>
          <button className="btn btn-primary btn-lg">Get Started</button>
        </div>
      </div>
    </>
  );
};

export default Home;
