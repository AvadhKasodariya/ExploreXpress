// client/pages/Login/login.jsx
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/contextAuthentication";
import "./login.css"; // Ensure this path matches your CSS file's location

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const { loading, error, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/authentication/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/"); // Redirects to the homepage or dashboard upon successful login
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      
      // Check if the error is due to "user not found"
      if (err.response && (err.response.status === 404 || err.response.data.message.includes("User not found"))) {
        // Notify the user
        alert("User not found. Please sign up.");
        
        // Redirect to the signup page after the alert
        navigate("/signup");
      } else {
        // Handle other types of errors (optional)
        alert("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2 className="loginTitle">Login</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="loginInput"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="loginInput"
            required
          />
          <button type="submit" disabled={loading} className="loginButton">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <span className="loginError">{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;




