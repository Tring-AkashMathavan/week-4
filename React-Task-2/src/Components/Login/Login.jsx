import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import "./Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === loginData.email);

    if (!existingUser) {
      setError("Email not registered.");
      return;
    }

    if (existingUser.password !== loginData.password) {
      setError("Invalid password.");
      return;
    }

    // Successful login
    dispatch(login(existingUser));
    navigate("/dashboard");
  };

  
  return (
    <section className="login">
      <div className="nav-login">
        <nav><h3>tringapps</h3></nav>
      </div>
      <div className="container-login">

      <div className="switch-buttons-login">
            <span>Login</span>
          </div>

        {error && <p className="error">{error}</p>}

        <input type="email" id="email" placeholder="Email" value={loginData.email} onChange={handleChange} required />
        <input type="password" id="password" placeholder="Password" value={loginData.password} onChange={handleChange} required />

        <div className="button-login">
        <button className="button-login" onClick={handleLogin}>Submit</button>
       
      

        <p className="login-submit">
          Don’t have an account? <a href="/register">Register</a>
        </p>
        </div>
      </div>
      
    </section>
  );
};

export default Login;



