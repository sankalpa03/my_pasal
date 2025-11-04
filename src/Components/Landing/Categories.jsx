//Categories.jsx
import React from 'react';

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCategoryCardClick = (categoryId) => {
    setSelectedCategory(categoryId);
    // Scroll to products section
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Categories</h2>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              All Products
            </button>
            {categories.map(category => (
              <button 
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="categories-grid">
          {categories.map(category => (
            <div 
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryCardClick(category.id)}
            >
              <img src={category.image} alt={category.name} />
              <div className="category-label">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;