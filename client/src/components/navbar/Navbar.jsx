import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/contextAuthentication"; // Adjust the path as needed

const Navbar = () => {
  const { userData, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("userData"); // Ensure to clear the user from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">ExploreXpress</span>
        </Link>
        <div className="navItems">
          {userData ? (
            <>
              <span style={{ marginRight: "20px" }}>Welcome, {userData.username}</span> {/* Display the username */}
              <button onClick={handleLogout} className="navButton">Logout</button> {/* Logout button */}
            </>
          ) : (
            <>
              <Link to="/signup" style={{ color: "inherit", textDecoration: "none" }}>
                <button className="navButton">Signup</button>
              </Link>
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
