import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { handleSignout } from "../../../util";
import { clearCart } from "../../features/cart/cartSlice";

export default function NavBar() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser") || "");
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart?.items) || [];
  const cartItemCount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      const user = localStorage.getItem("loggedInUser") || "";
      setLoggedInUser(user);
    };

    handleAuthChange();
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('cart');
    dispatch(clearCart());
    handleSignout("User Logged out...");
    window.dispatchEvent(new Event('authChange'));
    setTimeout(() => {
      navigate('/login', { replace: true });
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
          <Link to="home" className="menu-link">Home</Link>
          <Link to="create" className="menu-link">New</Link>
          <Link to="cart" className="menu-link">
            Cart {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          <Link to="contact" className="menu-link">Contact</Link>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </ul>
      ) : (
        <>
        </>
      )}
    </nav>
  );
}