// src/Components/Landing/quickview.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "./data"; 
import ProductGrid from "./ProductGrid";
import '../../App.css';

const ProductQuickView = ({ product: initialProduct, onClose, addToCart, isLandingPage = false }) => {
  const { productName: urlProductName } = useParams();

  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [userComment, setUserComment] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [commentSaved, setCommentSaved] = useState(false);
  const [savedComments, setSavedComments] = useState([]);


    useEffect(() => {
    if (urlProductName && !initialProduct) {
      const decodedProductName = decodeURIComponent(urlProductName);
      const foundProduct = products.find((p) => p.name === decodedProductName);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.warn(`Product with name "${decodedProductName}" not found.`);
      }
    } else if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [urlProductName, initialProduct]);


  useEffect(() => {
    if (product) {
      const comments = JSON.parse(localStorage.getItem("productComments") || "{}");
      setSavedComments(comments[product.name] || []);
    }
  }, [product]);

  if (!product) {
    if (urlProductName) {
      return (
        <div className="quick-view-page-container">
          <div className="quick-view-page-content">
            <p>Loading product details or product not found...</p>
          </div>
        </div>
      );
    }
    return null; // For modal without product
  }

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

  const handleQuantityInput = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value, 10) > 0)) {
      setQuantity(value);
    }
  };

  const handleSubmitCommentOnly = (e) => {
    e.preventDefault();
    if (userComment.trim()) {
      const comments = JSON.parse(localStorage.getItem("productComments") || "{}");
      const productComments = comments[product.name] || [];
      productComments.push(userComment.trim());
      comments[product.name] = productComments;
      localStorage.setItem("productComments", JSON.stringify(comments));
      setSavedComments(productComments);
      setCommentSaved(true);
      setUserComment("");
      setTimeout(() => setCommentSaved(false), 1200);
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    const qty = parseInt(quantity, 10);
    if (!qty || qty < 1) {
      alert("Please enter a valid quantity (1 or more).");
      return;
    }

    // --- Add to cart in localStorage ---
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    // Call parent's addToCart if provided
    if (typeof addToCart === "function") {
      addToCart(product, qty);
    }

    // Show notification
    if (!isLandingPage) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        if (typeof onClose === 'function') {
          onClose();
        }
      }, 1500);
    }
  };

  const quantityUnit = product.type === "liquid" ? "liter(s)" : "gram(s)";

  return (
    <div className={isLandingPage ? "quick-view-overlay" : "quick-view-page-container"}>
      <div className={isLandingPage ? "quick-view-modal" : "quick-view-page-content"}>
        {isLandingPage && (
          <button onClick={onClose} className="quick-view-close-btn">&times;</button>
        )}

        <h2 className="quick-view-title">{product.name}</h2>
        <div className="quick-view-content">
          <div className="quick-view-image-container">
            <img src={product.image} alt={product.name} className="quick-view-image" />
          </div>

          <div className="quick-view-details">
            <p className="quick-view-description">{product.description}</p>
            <p className="quick-view-price">Rs. {product.price}</p>

            <div className="quick-view-meta">
              <div className="product-rating">
                <span className="stars">{renderStars(product.rating)}</span>
                <span className="rating-count">({product.rating.toFixed(1)})</span>
              </div>
              <span className="product-sold">{product.sold.toLocaleString()} sold</span>
            </div>

            <form onSubmit={handleSubmitComment}>
              <div className="quick-view-section">
                <label className="quick-view-label">Quantity ({quantityUnit}):</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityInput}
                  min="1"
                  className="quick-view-input"
                  placeholder="1"
                  autoComplete="off"
                  disabled={isLandingPage} 
                />
              </div>

              <div className="quick-view-section" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label className="quick-view-label" style={{ marginRight: "8px" }}>Comment:</label>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  rows="2"
                  className="quick-view-textarea"
                  placeholder="Type your comment"
                  style={{ flex: 1, resize: "vertical" }}
                  disabled={isLandingPage} 
                />
                {!isLandingPage && (
                  <button
                    type="button"
                    className="comment-save-btn"
                    onClick={handleSubmitCommentOnly}
                  >
                    Save
                  </button>
                )}
              </div>

              {commentSaved && (
                <div className="comment-saved-msg">
                  Comment saved!
                </div>
              )}

              {savedComments.length > 0 && (
                <div className="comments-list">
                  <strong>Comments:</strong>
                  <ul>
                    {savedComments.map((comment, idx) => (
                      <li key={idx} className="comment-item">
                        <span className="comment-user">User{idx + 1}:</span> {comment}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                className="action-btn"
                style={{ marginTop: "18px" }}
                title={isLandingPage ? "Login to add to cart" : "Add to Cart"}
              >
                {isLandingPage ? "Add to Cart" : "Add to Cart"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="notification quick-view-notification">
          <div className="notification-content">
            <span className="emoji">✅</span>
            <div>
              <strong>Added to Cart!</strong>
              <p>{quantity}× {product.name}</p>
            </div>
          </div>
        </div>
      )}
   


     </div>
  );
};

export default ProductQuickView;
