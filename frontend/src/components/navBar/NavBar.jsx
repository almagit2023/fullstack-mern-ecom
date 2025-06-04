import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { handleSignout } from "../../../util";

export default function NavBar() {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  });

  const navigate = useNavigate()

  const handleLogout =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser')
    handleSignout("User Logged out...");
    setTimeout(()=>{
       navigate('/login')
    }, 600)
  }
  return (
    <nav className="navigation-block">
      {loggedInUser ? (
        <ul>
          <p className="profile-display">
            <CgProfile />
            <strong>Welcome {loggedInUser}</strong>
          </p>
          <Link to="home" className="menu-link">
            Home
          </Link>
          <Link to="create" className="menu-link">
            New
          </Link>
          <Link to="contact" className="menu-link">
            Contact
          </Link>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </ul>
      ) : (
        <></>
      )}
    </nav>
  );
}
