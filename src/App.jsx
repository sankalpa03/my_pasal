import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import Register from "./Components/Register";
import Cart from "./Components/Cart";
import Profile from "./Components/profile";
import  Settings from "./Components/setting";

  const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  //  Hide Navbar
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/register";

  //  Hide Footer 
  const hideFooter =
    location.pathname === "/signin" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Settings />} />


          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", padding: "50px" }}>
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
