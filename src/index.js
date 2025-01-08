import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import  Navbar  from "./components/Navbar";
// import Profile from "./pages/Profile"; // Correct import for default export

import {
  Home,
  DriverDashboard,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  ManagerDashboard,
  Profile,
  StudentDashboard,
  ForgetPassword,
  ThankYou,
   // If Profile is a named export, use this
} from "./pages";  // Correct imports for all components
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for user authentication on initial load
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setIsAuthenticated(true);
  }, []); // Ensure this only runs on mount

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Provider store={store}>
          {/* Navbar included only once here */}
          <Navbar 
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated} 
          />
          <Routes>
            <Route 
              path="/" 
              element={<Home 
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />} 
            />
            <Route 
              path="/product" 
              element={<Products />} 
            />
            <Route 
              path="/StudentDashboard" 
              element={<StudentDashboard/>}
            />
            <Route 
              path="/DriverDashboard" 
              element={<DriverDashboard />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage />} 
            />
            <Route 
              path="/cart" 
              element={<Cart />} 
            />
            <Route 
              path="/login" 
              element={<Login setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route 
              path="/register" 
              element={<Register />} 
            />
            <Route 
              path="/ManagerDashboard" 
              element={<ManagerDashboard/>} 
            />
            <Route 
              path="/checkout" 
              element={<Checkout />} 
            />
            <Route 
              path="/profile" 
              element={<Profile isAuthenticated={isAuthenticated} />} 
            />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route 
              path="*" 
              element={<PageNotFound />} 
            />
            <Route 
              path="/product/*" 
              element={<PageNotFound />} 
            />
            <Route
              path="/order-confirmed"
              element={<ThankYou />}
            >
            </Route>
          </Routes>
        </Provider>
      </ScrollToTop>
      <Toaster />
    </BrowserRouter>
  );
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
