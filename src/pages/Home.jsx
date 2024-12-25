import React, { useState } from "react";
import { Navbar, Main, Product, Footer } from "../components";

function Home({ isAuthenticated , setIsAuthenticated}) {
  return (
    <>
      <Navbar 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Main />
      <Product />
      <Footer />
    </>
  );
}

export default Home;
