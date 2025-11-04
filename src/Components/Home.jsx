import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Categories from "./Landing/Categories";
import ProductGrid from "./Landing/ProductGrid";
// ProductCard is not used directly in Home, can be removed from here if not used
// import ProductCard from "./Landing/ProductCard"; 
import { products, categories } from "./Landing/data";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // Filter products by category
  const filteredProducts = products.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  );

  // FIX: This function now correctly accepts 'quantity' as the second argument
  const handleAddToCart = (product, quantity = 1) => { // Added default quantity for safety
    console.log("Home: handleAddToCart called for", product.name, "with quantity", quantity);

    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Home: Cart before update:", cart);

    // Check if product already exists
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity; // Use the provided quantity
      console.log("Home: Updated quantity for existing item:", product.name);
    } else {
      cart.push({ ...product, quantity: quantity }); // Use the provided quantity
      console.log("Home: Added new item to cart:", product.name);
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Home: Cart saved to localStorage:", JSON.parse(localStorage.getItem("cart")));


    // IMPORTANT: Temporarily commented out navigation to observe notification and local storage.
    // If you want immediate navigation, uncomment this, but be aware it might skip visual confirmation.
    // navigate("/cart"); 
  };

  const handleQuickView = (product) => {
    // Here you would typically open a modal or navigate to a product detail page
  };


  return (
    <div className="min-h-screen bg-pink-50">
      
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductGrid 
        products={filteredProducts} 
        addToCart={handleAddToCart} 
        onQuickView={handleQuickView} // FIX: Ensure onQuickView is passed
      />
      
    </div>
  );
};

export default Home;