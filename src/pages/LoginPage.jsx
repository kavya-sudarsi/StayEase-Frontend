import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./LoginPage.css";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      const payload = JSON.parse(
        atob(res.data.token.split(".")[1])
      );

      const role = payload.role;

      localStorage.setItem("role", role);

      if (role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/user");
      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

    <div className="login-page">

      {/* Left Branding */}

      <div className="login-left">

        <div className="brand-content">

          <h1 className="brand-logo">
            StayEase
          </h1>

          <p className="brand-tagline">
            Find Comfortable Stays Across India
          </p>

          <p className="brand-description">

            Book verified PGs, Hostels and Apartments
            with secure online payments and instant
            confirmations.

          </p>

          <div className="feature-list">

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Verified Properties</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Instant Booking</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Secure Payments</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Email Notifications</span>
            </div>

          </div>

        </div>

      </div>

      {/* Right Login */}

      <div className="login-right">

        <div className="login-card">

          <h2 className="login-title">
            Welcome Back
          </h2>

          <p className="login-subtitle">
            Login to continue to StayEase
          </p>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            className="login-btn"
            onClick={login}
          >
            Login
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="register-text">

            Don't have an account?

            <Link
              to="/register"
              className="register-link"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default LoginPage;