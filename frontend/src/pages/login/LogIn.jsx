import React, { useState } from "react";
import "./LogIn.css";
import { login_url } from "../../../data";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../util";

export default function LogIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const loginPayload = {
    email: loginEmail,
    password: loginPassword,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginPayload);

    if (!loginPayload.email || !loginPayload.password) {
      return handleError("Both Email & Password Required..");
    }

    try {
      const response = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result; // Changed 'name' to 'userName'

      console.log(result.success);

      if (success) {
        handleSuccess("Login Successful..");
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name); // Use userName
        window.dispatchEvent(new Event('authChange'));
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleLogin} className="login-form">
        <h2>Login Form</h2>
        <div className="login-form-group">
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john@gmail.com"
            onChange={(e) => setLoginEmail(e.target.value)}
            value={loginEmail}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password Min Length 6.."
            onChange={(e) => setLoginPassword(e.target.value)}
            value={loginPassword}
            required
          />
        </div>
        <button type="submit" className="btn btn-login">Login</button>
      </form>
      <div className="navigate-login">
        <h4>
          Not a member Yet? <Link to="/signup" className="sign-up-link">Signup</Link>
        </h4>
      </div>
      <ToastContainer />
    </div>
  );
}