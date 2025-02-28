import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <h1 className="navbar-title">User Management</h1>
        <div className="navbar-links">
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/about">About Us</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
              <Link to="/about">About Us</Link>
              <Link to="/new-registration" className="new-registration">
                New Registration
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

