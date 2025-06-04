import React from "react";
import "./LogIn.css";
import { useState } from "react";
import { login_url } from "../../../data";
import { Link } from "react-router-dom";
// import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../util";
import { useNavigate } from "react-router-dom";


export default function LogIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate()

  const loginPayload = {
    email: loginEmail,
    password: loginPassword,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginPayload);

    if (
      !loginPayload.email ||
      !loginPayload.password
    ) {
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
      const { success , message , jwtToken , name, error} = result;


      console.log(result.success);

      if(success){
          handleSuccess("Login Successful..")
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('loggedInUser', name);

          setTimeout(()=>{
              navigate('/home');
          }, 1000)
      }
      else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message)
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={(e) => handleLogin(e)} className="signup-form">
        <h2>Login Form</h2>
        <div className="signup-form-group">
          <label htmlFor="">Enter Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="">Enter Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password Min Length 6.."
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-signup">
          Login
        </button>
      </form>
      <div className="navigate-login">
        <h4>
          Not a member Yet? <Link to="/signup">Signup</Link>{" "}
        </h4>
      </div>
      <ToastContainer />
    </div>
  );
}
