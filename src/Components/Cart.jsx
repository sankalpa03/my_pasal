// Cart.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../App.css';
import './Cart.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Add this

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartData = localStorage.getItem('cart');
    if (savedCartData) {
      setCart(JSON.parse(savedCartData));
    }
  }, []);

  // Sync cart changes to localStorage 
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity || 0),
    0
  );

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } }); // Navigate and pass cart
  };

  // Helper function to show unit
  const unit = (type) => (type === 'liquid' ? 'liter(s)' : 'gram(s)');

  return (
    <div className="cart-page-container">
      <div className="cart-page">
        <h2>Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">🛒 Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-grid">
              {cart.map(item => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>

                    <div className="cart-item-price">
                      Rs.{item.price} × {item.quantity} {unit(item.type)} = <strong>Rs.{item.price * item.quantity}</strong>
                    </div>

                    {item.comment && (
                      <div className="cart-item-comment">
                        <strong>Comment:</strong> {item.comment}
                      </div>
                    )}

                    <div className="cart-quantity-control">
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >−</button>
                      <div className="qty-display">{item.quantity}</div>
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >+</button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <h3>Total: Rs.{cartTotal}</h3>
            </div>

            <div className="cart-buttons">
              <button
                className="checkout-btn"
                onClick={handleCheckout} // Add onClick handler
              >
                Checkout
              </button>
              <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
