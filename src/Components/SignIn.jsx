import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChefHat, Eye, EyeOff } from "lucide-react";
import "./login.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) =>
        (u.email === credentials.email || u.username === credentials.email) &&
        u.password === credentials.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("accessToken", "token_" + Date.now());
      navigate("/home", { replace: true });
    } else {
      setError("Invalid email/username or password");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-center">
          <ChefHat />
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtext">
          Don’t have an account? <Link to="/register" className="auth-link">Register</Link> {/* Changed to auth-link */}
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email or Username"
            value={credentials.email}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credentials.password}
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

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;