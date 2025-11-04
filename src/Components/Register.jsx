import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChefHat, Eye, EyeOff } from "lucide-react";
import "./login.css"; // Import external CSS

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const validationErrors = [];
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      username,
    } = formData;

    // --- Validation Logic ---
    if (firstName.trim().length < 3) validationErrors.push("First name too short");
    if (lastName.trim().length < 3) validationErrors.push("Last name too short");
    if (!isValidEmail(email)) validationErrors.push("Invalid email format"); 
    if (!isValidPhoneNumber(phoneNumber)) validationErrors.push("Phone number must be 10 digits");
    if (username.trim().length < 3) validationErrors.push("Username too short (min 3 characters)");
    if (password.length < 8) validationErrors.push("Password must be 8+ characters");
    if (password !== confirmPassword) validationErrors.push("Passwords do not match");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      setErrors(["Email already registered"]);
      setLoading(false);
      return;
    }
    if (users.some((u) => u.username === username)) {
      setErrors(["Username already taken"]);
      setLoading(false);
      return;
    }

    const newUser = { ...formData };
    delete newUser.confirmPassword;
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setLoading(false);
    alert("Registration successful! Please sign in.");
    navigate("/signin");
  };

  return (
    <div className="auth-container">
      <div className="auth-card"> 
        <div className="icon-center"> 
          <ChefHat size={50} color="#e91e63" /> 
        </div>
        <h2 className="auth-title">Create Your Account</h2> 
        <p className="auth-subtext"> 
            Already have an account?{" "}
            <Link to="/signin" className="auth-link"> 
              Sign in
            </Link>
        </p>

        {errors.length > 0 && (
          <div className="error-box">
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}> 
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="auth-input"
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="auth-input" 
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="auth-input" 
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input" 
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="auth-input" 
            required
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input" 
              required
            />
            <span
              className="password-toggle" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input" 
              required
            />
            <span
              className="password-toggle" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
            </span>
          </div>
          <button type="submit" disabled={loading} className="auth-btn"> 
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;