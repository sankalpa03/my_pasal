import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog } from "react-icons/fa";
import "./profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  const loadUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // localStorage changes
    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!user) {
    return (
      <div className="profile-wrapper">
        <h2>No user data found. Please log in.</h2>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
           
            className="profile-avatar"
          />
        ) : (
          <FaUserCircle className="profile-avatar" />
        )}
        <h1>{user.firstName + " " + user.lastName}</h1>
        <p>@{user.username}</p>
        <button
          className="settings-link"
          onClick={() => navigate("/setting")}
        >
          <FaCog /> Edit Profile
        </button>
      </div>

      <div className="profile-card">
        <h3>Personal Information</h3>
        <div className="info-grid">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
