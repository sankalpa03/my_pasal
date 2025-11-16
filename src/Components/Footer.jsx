import React, { useState } from "react";
import "./footer.css";

// --- Modal Pages ---

function HelpCenter() {
  const faqs = [
    { question: "How do I place an order?", answer: "Browse products, add them to your cart, and checkout." },
    { question: "What payment methods are available?", answer: "We accept Cash on Delivery and eSewa." },
    { question: "How do I return a product?", answer: "Request a return within 7 days of delivery via our Returns page." },
    { question: "Can I cancel an order?", answer: "Yes, you can cancel before it’s shipped from your orders page." },
    { question: "How can I track my order?", answer: "Track your order in the 'My Orders' section after logging in." },
    { question: "How can I contact customer support?", answer: "Reach us via our Contact Us page or email sankalpa085@gmail.com" },
    { question: "Do you offer discounts?", answer: "Yes, we offer seasonal discounts and promo codes." },
    { question: "Is my personal information safe?", answer: "Absolutely. We follow strict privacy policies and encryption methods." },
  ];
  return (
    <div className="modal-section">
      <h1>Help Center</h1>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowToBuy() {
  return (
    <div className="modal-section">
      <h1>How to Buy</h1>
      <ol className="buy-steps">
        <li>Browse products on our website.</li>
        <li>Select your item and click “Add to Cart”.</li>
        <li>Go to your cart and click “Checkout”.</li>
        <li>Fill in your shipping details.</li>
        <li>Select payment method (Cash on Delivery / eSewa).</li>
        <li>Confirm your order and wait for delivery.</li>
      </ol>
    </div>
  );
}

function ReturnsRefunds() {
  return (
    <div className="modal-section">
      <h1>Returns & Refunds</h1>
      <ol className="return-steps">
        <li>Request a return within 7 days of delivery.</li>
        <li>Ensure the product is unused and in original packaging.</li>
        <li>Our team will guide you for pick-up or drop-off.</li>
        <li>Refunds are processed within 5–7 business days after inspection.</li>
      </ol>
    </div>
  );
}

function ContactUs() {
  return (
    <div className="modal-section">
      <h1>Contact Us</h1>
      <ul className="contact-list">
        <li>Email: <a href="mailto:sankalpa085@gmail.com">sankalpa085@gmail.com</a></li>
        <li>Phone: +977-9804182759</li>
        <li>Address: Lekhnath, Pokhara, Nepal</li>
      </ul>
    </div>
  );
}

function Terms() {
  return (
    <div className="modal-section">
      <h1>Terms and Conditions</h1>
      <p>By using Pasal, you agree to our terms regarding product use, delivery, and returns.</p>
    </div>
  );
}

function Privacy() {
  return (
    <div className="modal-section">
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. We do not share your data with third parties.</p>
    </div>
  );
}

function DigitalPayments() {
  return (
    <div className="modal-section">
      <h1>Digital Payments</h1>
      <p>We support secure digital transactions via eSewa and other trusted platforms.</p>
    </div>
  );
}

function CashOnDelivery() {
  return (
    <div className="modal-section">
      <h1>Cash on Delivery</h1>
      <p>Pay when your order arrives — simple, secure, and convenient.</p>
    </div>
  );
}

function ESewa() {
  return (
    <div className="modal-section">
      <h1>eSewa Payment</h1>
      <p>Make instant and secure online payments via your eSewa wallet.</p>
    </div>
  );
}

// --- Footer Component ---
function Footer() {
  const [modalContent, setModalContent] = useState(null);
  const openModal = (type) => setModalContent(type);
  const closeModal = () => setModalContent(null);

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="customer-care">
            <h3>Customer Care</h3>
            <ul>
              <li onClick={() => openModal("help")}>Help Center</li>
              <li onClick={() => openModal("buy")}>How to Buy</li>
              <li onClick={() => openModal("returns")}>Returns & Refunds</li>
              <li onClick={() => openModal("contact")}>Contact Us</li>
            </ul>
          </div>

          <div className="about-parcel">
            <h3>About Pasal</h3>
            <ul>
              <li onClick={() => openModal("terms")}>Terms and Conditions</li>
              <li onClick={() => openModal("privacy")}>Privacy Policy</li>
              <li onClick={() => openModal("payments")}>Digital Payments</li>
            </ul>
          </div>

          <div className="payment-methods">
            <h3>Payment Methods</h3>
            <ul>
              <li onClick={() => openModal("cod")}>Cash on Delivery</li>
              <li onClick={() => openModal("esewa")}>eSewa</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 <span className="brand">Pasal</span>. All Rights Reserved.
        </div>
      </footer>

      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            {modalContent === "help" && <HelpCenter />}
            {modalContent === "buy" && <HowToBuy />}
            {modalContent === "returns" && <ReturnsRefunds />}
            {modalContent === "contact" && <ContactUs />}
            {modalContent === "terms" && <Terms />}
            {modalContent === "privacy" && <Privacy />}
            {modalContent === "payments" && <DigitalPayments />}
            {modalContent === "cod" && <CashOnDelivery />}
            {modalContent === "esewa" && <ESewa />}
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
