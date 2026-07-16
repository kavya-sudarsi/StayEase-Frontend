import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./RegisterPage.css";

function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  const register = async () => {

    try {

      await API.post("/auth/register", {
        name,
        email,
        password,
        role
      });

      alert("Registration Successful!");

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <div className="register-page">

      <div className="register-left">

        <div className="brand-content">

          <h1 className="brand-logo">
            StayEase
          </h1>

          <h2 className="brand-tagline">
            Start Your Journey With StayEase
          </h2>

          <p className="brand-description">
            Join thousands of users discovering verified
            PGs, hostels and apartments across India with
            secure bookings and instant confirmations.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              Verified Properties
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              Secure Online Payments
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              Instant Booking Confirmation
            </div>

            <div className="feature-item">
              <span className="feature-icon">✓</span>
              Email Notifications
            </div>

          </div>

        </div>

      </div>

      <div className="register-right">

        <div className="register-card">

          <h1 className="register-title">
            Create Account
          </h1>

          <p className="register-subtitle">
            Register to start booking amazing stays
          </p>

          <div className="input-group">

            <label>Full Name</label>

            <input
              className="register-input"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Email Address</label>

            <input
              className="register-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              className="register-input"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Register As</label>

            <select
              className="register-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >

              <option value="USER">
                User
              </option>

              <option value="OWNER">
                Property Owner
              </option>

            </select>

          </div>

          <button
            className="register-btn"
            onClick={register}
          >
            Create Account
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="login-text">

            Already have an account?

            <Link
              className="login-link"
              to="/login"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default RegisterPage;