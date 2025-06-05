import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { handleSignout } from "../../../util";
import { clearCart } from "../../features/cart/cartSlice";

export default function NavBar() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart?.items) || []; // Fallback to empty array
  const cartItemCount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('cart');
    dispatch(clearCart());
    handleSignout("User Logged out...");
    setTimeout(() => {
      navigate('/login');
    }, 600);
  };

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
          <Link to="cart" className="menu-link">
            Cart {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          <Link to="contact" className="menu-link">
            Contact
          </Link>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </ul>
      ) : (
        <>
          <h2 className="welcome-header">Welcome To ECOM CART !! Please <Link to='/signup' className="sign-up-link">Sign Up</Link></h2>
        </>
      )}
    </nav>
  );
}