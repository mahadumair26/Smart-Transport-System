import React, { useEffect, useState } from "react";
import { Navbar, Main, Product, Footer } from "../components";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check user authentication on page load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      {/* <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> */}
      {/* <Product /> */}
      <Main />
      <Footer />
    </>
  );
}

export default Home;
