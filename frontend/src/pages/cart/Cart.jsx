import React from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../../features/cart/cartSlice';
import { GiEmptyChessboard } from 'react-icons/gi';

export default function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <table className="cart-table">
            <thead className="cart-header-table">
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="cart-data-table">
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="btn btn-quantity"
                      onClick={() => dispatch(decrementQuantity(item._id))}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="btn btn-quantity"
                      onClick={() => dispatch(incrementQuantity(item._id))}
                    >
                      +
                    </button>
                  </td>
                  <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-remove"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h3>Total Price: ${calculateTotal()}</h3>
            <button
              className="btn btn-clear-cart"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <GiEmptyChessboard className="empty-cart-icon" />
          <h3>
            Your Cart is Empty!! <Link to="/home">Click Here</Link> to Add Products
          </h3>
        </div>
      )}
    </div>
  );
}