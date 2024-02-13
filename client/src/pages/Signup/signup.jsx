// client/pages/Signup/signup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate
import "./signup.css"; // Ensure you have a CSS file named signup.css in the same directory

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate(); // Instantiate useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/authentication/signup', formData);
      alert('Signup successful!');
      navigate('/login'); // Redirect to login page upon successful signup
    } catch (error) {
      // Improved error handling
      setError("Failed to sign up. Please try again.");
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="signupPage">
      <div className="signupContainer">
        <h2 className="signupTitle">Signup</h2>
        {error && <p className="signupError">{error}</p>}
        <form onSubmit={handleSubmit} className="signupForm">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="signupInput"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="signupInput"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="signupInput"
            required
          />
          <button type="submit" className="signupButton">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;



