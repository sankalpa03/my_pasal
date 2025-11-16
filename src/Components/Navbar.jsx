import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./../App.css";

const Navbar = ({ cartItemsCount, searchTerm, setSearchTerm, isLandingPage = false }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const timerRef = useRef(null);

  // Handle profile hover or click
  const handleProfileOpen = () => {
    clearTimeout(timerRef.current);
    if (!isLandingPage) setShowProfileMenu(true);
  };

  const handleProfileClose = () => {
    // wait 2 seconds before closing
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowProfileMenu(false);
    }, 2000);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timerRef.current);
    };
  }, []);

  // Navigation handler
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (isLandingPage) {
      navigate("/signin");
    } else {
      navigate(path);
      setShowProfileMenu(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <a href="/home" onClick={(e) => handleNavClick(e, "/home")} className="logo">
            <img
              src="/image/pasal_logo.png"
              alt="Pasal Logo"
              className="navbar-logo"
            />
          </a>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Header Icons */}
          <div className="header-icons">
            {/* Cart */}
            <button onClick={(e) => handleNavClick(e, "/cart")} className="icon-btn">
              🛒
             {!isLandingPage && cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
            </button>

            {/* Profile */}
            <div
              className="profile-container"
              ref={profileRef}
              onMouseEnter={handleProfileOpen}
              onMouseLeave={handleProfileClose}
            >
              <button
                onClick={handleProfileOpen}
                className="icon-btn profile-btn"
              >
                ⚙️
              </button>

              {!isLandingPage && showProfileMenu && (
                <div className="profile-menu fade-in">
                  <button onClick={(e) => handleNavClick(e, "/profile")} className="menu-item">
                    Profile
                  </button>
                  <button onClick={(e) => handleNavClick(e, "/setting")} className="menu-item">
                    Settings
                  </button>
                  <button onClick={(e) => handleNavClick(e, "/")} className="menu-item logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* ✅ Login Button - only show on landing page */}
            {isLandingPage && (
              <button
                onClick={() => navigate("/signin")}
                className="login-btn"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;