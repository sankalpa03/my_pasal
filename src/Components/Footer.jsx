import React, { useState } from "react";
import "./footer.css";

// Modal Pages

// Help Center
function HelpCenter() {
  const faqs = [
    { question: "How do I place an order?", answer: "Browse products, add them to your cart, and checkout." },
    { question: "What payment methods are available?", answer: "We accept Cash on Delivery and eSewa." },
    { question: "How do I return a product?", answer: "Request a return within 7 days of delivery via our Returns page." },
    { question: "Can I cancel an order?", answer: "Yes, you can cancel before it’s shipped from your orders page." },
    { question: "How can I track my order?", answer: "You can track your order in the 'My Orders' section after logging in." },
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

// How to Buy
function HowToBuy() {
  return (
    <div className="modal-section">
      <h1>How to Buy</h1>
      <ol className="buy-steps">
        <li>Browse the products on our website.</li>
        <li>Select the product you want and click "Add to Cart".</li>
        <li>Go to your Cart and click "Checkout".</li>
        <li>Fill in your shipping and contact details.</li>
        <li>Select your payment method (Cash on Delivery, eSewa).</li>
        <li>Confirm your order and wait for delivery.</li>
        <li>You can track your order in "My Orders" section.</li>
      </ol>
    </div>
  );
}

// Returns & Refunds
function ReturnsRefunds() {
  return (
    <div className="modal-section">
      <h1>Returns & Refunds</h1>
      <p>We want you to be satisfied with your purchase. If you wish to return a product:</p>
      <ol className="return-steps">
        <li>Request a return within 7 days of delivery through your Orders page.</li>
        <li>Ensure the product is unused and in original packaging.</li>
        <li>Our support team will guide you for pick-up or drop-off.</li>
        <li>Once the product is received and inspected, your refund will be processed within 5-7 business days.</li>
      </ol>
    </div>
  );
}

// Contact Us
function ContactUs() {
  return (
    <div className="modal-section">
      <h1>Contact Us</h1>
      <p>We’re here to help! You can reach us in multiple ways:</p>
      <ul className="contact-list">
        <li>Email: <a href="mailto:sankalpa085@gmail.com">sankalpa085@gmail.com</a></li>
        <li>Phone: +977-9804182759</li>
        <li>Address: Lekhnath, Pokhara, Nepal</li>
      </ul>
    </div>
  );
}

// Terms & Conditions
function Terms() {
  return (
    <div className="modal-section">
      <h1>Terms and Conditions</h1>
      <p>Welcome to Pasal! By using our services, you agree to comply with our terms and conditions.</p>
    </div>
  );
}

// Privacy Policy
function Privacy() {
  return (
    <div className="modal-section">
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. We collect and use your data responsibly.</p>
    </div>
  );
}

// Digital Payments
function DigitalPayments() {
  return (
    <div className="modal-section">
      <h1>Digital Payments</h1>
      <p>We support secure digital payments via eSewa, Khalti, and other platforms.</p>
    </div>
  );
}

// Cash on Delivery
function CashOnDelivery() {
  return (
    <div className="modal-section">
      <h1>Cash on Delivery</h1>
      <p>Pay when your order arrives at your doorstep. No online payment required.</p>
    </div>
  );
}

// eSewa Payment
function ESewa() {
  return (
    <div className="modal-section">
      <h1>eSewa Payment</h1>
      <p>Secure online payment via eSewa wallet. Instant and safe transaction.</p>
    </div>
  );
}

// Footer Component
function Footer() {
  const [modalContent, setModalContent] = useState(null);
  const openModal = (type) => setModalContent(type);
  const closeModal = () => setModalContent(null);

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          {/* Customer Care */}
          <div className="customer-care">
            <h3>Customer Care</h3>
            <ul>
              <li onClick={() => openModal("help")}>Help Center</li>
              <li onClick={() => openModal("buy")}>How to Buy</li>
              <li onClick={() => openModal("returns")}>Returns & Refunds</li>
              <li onClick={() => openModal("contact")}>Contact Us</li>
            </ul>
          </div>

          {/* About Pasal */}
          <div className="about-parcel">
            <h3>About Pasal</h3>
            <ul>
              <li onClick={() => openModal("terms")}>Terms and Conditions</li>
              <li onClick={() => openModal("privacy")}>Privacy Policy</li>
              <li onClick={() => openModal("payments")}>Digital Payments</li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h3>Payment Methods</h3>
            <ul>
              <li onClick={() => openModal("cod")}>Cash on Delivery</li>
              <li onClick={() => openModal("esewa")}>eSewa</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>X</button>
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
