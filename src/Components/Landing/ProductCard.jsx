import React, { useState } from "react";

const ProductCard = ({ product, addToCart, onQuickView }) => {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // This correctly passes product and quantity to the prop
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "⯨"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          {product.onSale && <span className="sale-badge">SALE</span>}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>

          <div className="product-rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <span className="rating-count">({product.rating.toFixed(1)})</span>
          </div>

          <div className="product-price">Rs. {product.price}</div>
          <div className="product-sold">{product.sold.toLocaleString()} sold</div>

          <div className="product-actions">
            <div className="quantity-control">
              <button className="qty-btn" onClick={() => handleQuantityChange(-1)}>-</button>
              <span className="qty-display">{quantity}</span>
              <button className="qty-btn" onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <button className="quick-view-btn" onClick={() => onQuickView(product)}>Quick View</button>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <span className="emoji">✅</span>
            <div>
              <strong>Added to Cart!</strong>
              <p>{quantity}× {product.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;