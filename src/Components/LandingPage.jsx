import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./Landing/Categories";
import ProductGrid from "./Landing/ProductGrid";
import Navbar from "./Navbar";
import { products, categories } from "./Landing/data";

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  );

  const handleAddToCart = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Pass isLandingPage prop here */}
      <Navbar isLandingPage={true} />

      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductGrid products={filteredProducts} addToCart={handleAddToCart} />
    </div>
  );
};

export default LandingPage;
