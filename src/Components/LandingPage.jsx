import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./Landing/Categories";
import ProductGrid from "./Landing/ProductGrid";
import ProductQuickView from "./Landing/quickview";
import { products, categories } from "./Landing/data";
import Navbar from "./Navbar";

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const navigate = useNavigate();


  const handleNavClick = (e, path) => {
    e.preventDefault();

    if (path === "/signin") {
      navigate("/signin");
      return;
    }
  navigate(path);
  };

  const filteredProducts = products.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  );

  const handleAddToCart = (product, quantity = 1) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/signin");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="min-h-screen bg-pink-50">

      <Navbar 
        isLandingPage={true}
        handleNavClick={handleNavClick}
      />

      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ProductGrid
        products={filteredProducts}
        addToCart={handleAddToCart}
        onQuickView={handleQuickView}
      />

      {showQuickView && quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={handleCloseQuickView}
          addToCart={handleAddToCart}
          isLandingPage={true}  
        />
      )}
    </div>
  );
};

export default LandingPage;
