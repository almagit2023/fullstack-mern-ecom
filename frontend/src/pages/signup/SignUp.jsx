import React from "react";
import "./SignUp.css";
import { useState } from "react";
import { signup_url } from "../../../data";
import { Link } from "react-router-dom";
// import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../util";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();

  const signupPayload = {
    name: signupName,
    email: signupEmail,
    password: signupPassword,
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(signupPayload);

    if (
      !signupPayload.name ||
      !signupPayload.email ||
      !signupPayload.password
    ) {
      return handleError("Name, Email & Password Required..");
    }

    try {
      const response = await fetch(signup_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupPayload),
      });
      const result = await response.json();
      console.log(result.success);
      const { success, message, error } = result;
      if (success) {
        handleSuccess("Registration Successful..");
        setTimeout(() => {
          navigate("/login");
        }, 600);
      } else if (error) {
        const details = error?.details[0];
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
      <form action="" onSubmit={(e) => handleSignup(e)} className="signup-form">
        <h2>Sign Up Form</h2>
        <div className="signup-form-group">
          <label htmlFor="">Enter Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe..."
            autoFocus
            onChange={(e) => setSignupName(e.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="">Enter Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            onChange={(e) => setSignupEmail(e.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="">Enter Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password Min Length 6.."
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-signup">
          Sign Up
        </button>
      </form>
      <div className="navigate-login">
        <h4>
          Already have an Account? <Link to="/login">Login</Link>{" "}
        </h4>
      </div>
      <ToastContainer />
    </div>
  );
}
