//Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="customer-care">
          <h3>Customer Care</h3>
          <ul>
            <li>Help Center</li>
            <li>How to Buy</li>
            <li>Returns and Refunds</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="about-parcel">
          <h3>About Pasal</h3>
          <ul>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Digital Payments</li>
          </ul>
        </div>
        <div className="payment-methods">
          <h3>Payment Methods</h3>
          <ul>
            <li>Cash on Delivery</li>
            <li>eSewa</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;