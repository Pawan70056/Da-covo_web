import React, { useState } from "react";
import { toast } from "react-toastify";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const backend_url = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const login = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required.");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("token", json.token);
        toast.success("You're logged in.");
        window.location.replace("/");
      } else {
        toast.error(json.error || "Login failed.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    }
  };

  const signup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Username, email and password are required.");
      return;
    }
    try {
      const response = await fetch(`${backend_url}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("token", json.token);
        toast.success("Account created.");
        window.location.replace("/");
      } else {
        toast.error(json.error || "Signup failed.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error(error);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginsignup-container">
      <h1>{state}</h1>
      <div className="loginsignup-fields">
        {state === "Sign Up" && (
          <input
            name="username"
            value={formData.username}
            onChange={changeHandler}
            type="text"
            placeholder="Your Username"
          />
        )}
        <input
          name="email"
          value={formData.email}
          onChange={changeHandler}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={formData.password}
          onChange={changeHandler}
          type="password"
          placeholder="Password"
        />
      </div>
      <button
        type="button"
        onClick={() => {
          state === "Login" ? login() : signup();
        }}
      >
        {state}
      </button>
      {state === "Sign Up" ? (
        <p className="loginsignup-login">
          Already have an account?{" "}
          <span
            onClick={() => setState("Login")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Login
          </span>
        </p>
      ) : (
        <p className="loginsignup-login">
          Create an account?{" "}
          <span
            onClick={() => setState("Sign Up")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Click Here
          </span>
          <br />
        </p>
      )}
    </div>
  );
};

export default LoginSignup;
