// Landing/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, addToCart, onQuickView }) => {
  const flashSaleProducts = products.filter(product => product.onSale);
  const regularProducts = products.filter(product => !product.onSale);

  return (
    <>
      {/* Flash Sale Section */}
      {flashSaleProducts.length > 0 && (
        <section className="products-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Flash Sale</h2>
              <button className="quick-view-btn" style={{ padding: '10px 25px' }}>
                SHOP ALL PRODUCTS
              </button>
            </div>

            <div className="products-grid">
              {flashSaleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Just For You Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Just For You</h2>
          </div>

          <div className="products-grid">
            {regularProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
              className="add-to-cart-btn"
              style={{
                padding: '15px 60px',
                borderRadius: '50px',
                fontSize: '18px',
                backgroundColor: 'white',
                color: 'var(--primary-color)'
              }}
              onClick={() => alert('Loading more products... This feature would load additional products from the server.')}
            >
              Load More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};


export default ProductGrid;
