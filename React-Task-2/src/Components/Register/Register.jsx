import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice"; 
import "./Register.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "english",
    country: "+91",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateInputs = () => {
    const { name, email, phone, password } = formData;
    if (!name || !email || !phone || !password) return "All fields are required.";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) return "Invalid email format.";
    if (!/^\d{10}$/.test(phone)) return "Phone number must be 10 digits.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === formData.email)) {
      setError("Email is already registered.");
      return;
    }

    const newUser = { id: `user_${Date.now()}`, ...formData };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    dispatch(login(newUser)); 
    alert("Registration successful!");
    navigate("/dashboard");
  };

  return (
    <section className="register">

      <div className="tringapps-register">

        <nav className="tringapp-logo">
          <h3>tringapps</h3>
        </nav>

        <div className="container-reg">
          <div className="switch-buttons-reg">
            <span>Register</span>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>} 

          <div className="input-data-reg">
            <label htmlFor="name">
              Your Name<span style={{ color: "#cc1e4f" }}>*</span>
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">
              Your Email<span style={{ color: "#cc1e4f" }}>*</span>
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="language">Language</label>

            <select id="language" value={formData.language} onChange={handleChange} required>
              <option value="english">English</option>
              <option value="chinese">Chinese</option>
              <option value="german">German</option>
              <option value="arabic">Arabic</option>
            </select>

            <label htmlFor="phone">Phone Number<span style={{ color: "#cc1e4f" }}>*</span></label>

            <div className="phone-no">
              <select id="country" value={formData.country} onChange={handleChange} required>
                <option value="+91" className="country-child">🇮🇳 +91</option>
                <option value="+1" className="country-child">🇺🇸 +1</option>
                <option value="+86" className="country-child">🇨🇳 +86</option>
                <option value="+49" className="country-child">🇩🇪 +49</option>
              </select>

              <input
                type="tel"
                id="phone"
                placeholder="Enter phone-no"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

            <label htmlFor="password">
              Password<span style={{ color: "#cc1e4f" }}>*</span>
            </label>

            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>
          <div className="button-submit">
          <button className="submit-btn-reg" onClick={handleSubmit}>
            Submit
          </button>
         

          <p className="signup">
            Already have an account? <a href="login">Login</a>
          </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default RegisterForm;



