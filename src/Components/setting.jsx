import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaLock, FaCamera } from "react-icons/fa";
import "./profile.css";

const ProfileSettings = () => {
  const [editData, setEditData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [previewImage, setPreviewImage] = useState("");
  const [originalId, setOriginalId] = useState(""); //  original email or username
  const navigate = useNavigate();

  // Load user from localStorage and save a stable identifier
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setEditData(storedUser);
      setPreviewImage(storedUser.profilePicture || "");
      // Use email if available, otherwise username as identifier
      setOriginalId(storedUser.email || storedUser.username || "");
    }
  }, []);

  // profile input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setEditData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Show notification
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  //  update users array by matching original Id (email or username)
  const upsertUserInUsersArray = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // find by original Id matching either email or username
    const index = users.findIndex(
      (u) => (originalId && (u.email === originalId || u.username === originalId))
    );

    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
    } else {
      // No match found — try to find by current email/username (edge cases)
      const fallbackIndex = users.findIndex(
        (u) => u.email === updatedUser.email || u.username === updatedUser.username
      );
      if (fallbackIndex !== -1) {
        users[fallbackIndex] = { ...users[fallbackIndex], ...updatedUser };
      } else {
        //  push as new user
        users.push(updatedUser);
      }
    }

    localStorage.setItem("users", JSON.stringify(users));
  };

  // Save profile updates with users + loggedInUser
  const handleSave = () => {
    if (!editData || Object.keys(editData).length === 0) {
      return showMessage("Nothing to save.", "error");
    }

    // Update users array using stable identifier
    upsertUserInUsersArray(editData);

    // Update loggedInUser
    localStorage.setItem("loggedInUser", JSON.stringify(editData));

    // If email or username changed, update original Id to new one
    setOriginalId(editData.email || editData.username || originalId);

    showMessage("Profile updated successfully!", "success");
    setTimeout(() => navigate("/profile"), 1200);
  };

  // Handle password update  with users + loggedInUser
  const handlePasswordSave = () => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!storedUser) return showMessage("No user found.", "error");

    if (passwordData.currentPassword !== storedUser.password)
      return showMessage("Current password is incorrect.", "error");
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return showMessage("New passwords do not match.", "error");

    //  updated user with new password
    const updatedUser = { ...storedUser, password: passwordData.newPassword };

    // Update users list using stable identifier
    upsertUserInUsersArray(updatedUser);

    // Update loggedInUser
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // Clear password inputs
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    showMessage("Password changed successfully!", "success");
  };

  return (
    <div className="profile-wrapper">
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate("/profile")}>
          <FaArrowLeft /> Back
        </button>
        <h1>Edit Profile</h1>
      </div>

      {message.text && (
        <div className={`notification ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-card">
        <div className="profile-picture-wrapper">
          <img
            src={previewImage || "/default-profile.png"}
            
            className="profile-picture"
          />
          <label className="camera-icon">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
          </label>
        </div>

        <div className="form-grid">
          <label>First Name</label>
          <input name="firstName" value={editData.firstName || ""} onChange={handleChange} />

          <label>Last Name</label>
          <input name="lastName" value={editData.lastName || ""} onChange={handleChange} />

          <label>Username</label>
          <input name="username" value={editData.username || ""} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={editData.email || ""} onChange={handleChange} />

          <label>Phone Number</label>
          <input name="phoneNumber" value={editData.phoneNumber || ""} onChange={handleChange} />

          <label>Address</label>
          <input name="address" value={editData.address || ""} onChange={handleChange} />
        </div>

        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
          <button className="cancel-btn" onClick={() => navigate("/profile")}>Cancel</button>
        </div>
      </div>

      <div className="password-section">
        <h2><FaLock /> Change Password</h2>
        <div className="form-grid">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />

          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="button-group">
          <button className="save-btn" onClick={handlePasswordSave}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
