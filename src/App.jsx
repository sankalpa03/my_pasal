import React, { useState, useEffect } from "react";
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
import Settings from "./Components/setting";
import QuickView from "./Components/Landing/quickview";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemsCount(totalItems);

  

    };

    
  

    updateCartCount(); // Set initial count
    window.addEventListener("storage", updateCartCount); // Listen for storage changes
    return () => window.removeEventListener("storage", updateCartCount);
  }, []); // Run once on mount

  const handleGlobalSearch = (term) => {
    setSearchTerm(term);
  };

  const LayoutWrapper = ({ children }) => {
    const location = useLocation();

    const hideNavbar =
      location.pathname === "/" ||
      location.pathname === "/signin" ||
      location.pathname === "/register";

    const hideFooter =
      location.pathname === "/signin" ||
      location.pathname === "/register";

    return (
      <>
        {!hideNavbar && (
          <Navbar
            cartItemsCount={cartItemsCount}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={location.pathname === "/home" ? handleGlobalSearch : null}
            isLandingPage={false}
          />
        )}
        {children}
        {!hideFooter && <Footer />}
      </>
    );
  };

  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Settings />} />
        
          <Route path="/product-details/:productName" element={<QuickView />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setGlobalCartCount={setCartItemsCount} // Passed to Home
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                {/* Pass the setter to the Cart component */}
                <Cart setGlobalCartCount={setCartItemsCount} />
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