import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const [search, setSearch] = useState("");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const handleSearch = () => {

    if (!search.trim()) return;

    navigate(`/user?city=${encodeURIComponent(search)}`);

  };

  return (

    <header className="navbar">

      <div
        className="navbar-logo"
        onClick={() =>
          navigate(role === "OWNER" ? "/owner" : "/user")
        }
      >

        <div className="logo-circle">
          🏠
        </div>

        <div>

          <h2 className="nav-title">
            StayEase
          </h2>

          <span className="nav-tagline">
            Book • Stay • Relax
          </span>

        </div>

      </div>

      {role === "USER" && (

        <div className="nav-search">

          <input
            type="text"
            placeholder="Search city or property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

        <button
            className="search-btn"
            onClick={handleSearch}
        >
            <span>🔍</span>
        </button>

        </div>

      )}

      <div className="nav-links">

        {role === "OWNER" && (

          <>
            <button
              className={`nav-btn ${
                location.pathname === "/owner"
                  ? "active-nav"
                  : ""
              }`}
              onClick={() => navigate("/owner")}
            >
              Dashboard
            </button>

            <button
              className={`nav-btn ${
                location.pathname === "/owner-bookings"
                  ? "active-nav"
                  : ""
              }`}
              onClick={() => navigate("/owner-bookings")}
            >
              Bookings
            </button>
          </>

        )}

        {role === "USER" && (

          <>
            <button
              className={`nav-btn ${
                location.pathname === "/user"
                  ? "active-nav"
                  : ""
              }`}
              onClick={() => navigate("/user")}
            >
              Explore
            </button>

            <button
              className={`nav-btn ${
                location.pathname === "/bookings"
                  ? "active-nav"
                  : ""
              }`}
              onClick={() => navigate("/bookings")}
            >
              My Bookings
            </button>
          </>

        )}

      </div>

      <div className="nav-right">

        <div className="role-badge">

          👤 {role}

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >

          Logout

        </button>

      </div>

    </header>

  );

}

export default Navbar;