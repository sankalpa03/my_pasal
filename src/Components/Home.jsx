// src/Components/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./Landing/Categories";
import ProductGrid from "./Landing/ProductGrid";
import { products, categories } from "../Components/Landing/data";

const Home = ({ searchTerm, setSearchTerm, setGlobalCartCount }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCountFromStorage = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      if (setGlobalCartCount) {
        setGlobalCartCount(totalItems);
      }
    };

    updateCartCountFromStorage();
   
  }, [setGlobalCartCount]); 
  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.description.toLowerCase().includes(searchTerm.toLowerCase())) // Added search filter
  );

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // update the  cart count when an item is added
    if (setGlobalCartCount) {
      setGlobalCartCount((prevCount) => prevCount + 1);
    }
  };

  const handleActionToQuickViewPage = (product) => {
    navigate(`/product-details/${encodeURIComponent(product.name)}`);
  };

  return (
    <div className="min-h-screen bg-pink-50">
\      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductGrid
        products={filteredProducts}
        addToCart={handleAddToCart}
        onQuickView={handleActionToQuickViewPage}
      />
    </div>
  );
};

export default Home;
