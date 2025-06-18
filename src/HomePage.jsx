import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-root">
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="home-navbar-title">Helping Hands</div>
        <ul className="home-navbar-list">
          <li><Link to="/" className="home-navbar-link">Home</Link></li>
          <li><Link to="/about us" className="home-navbar-link">About</Link></li>
          <li><Link to="/opportunities" className="home-navbar-link">Opportunities</Link></li>
          <li><Link to="/organization" className="home-navbar-link">Organization</Link></li>
          <li><Link to="#" className="home-navbar-link">Contact</Link></li>
        </ul>
        <div>
          <button className="home-login-btn">Login</button>
          <button className="home-signup-btn" onClick={() => navigate("/sign up")}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="home-hero-img-container">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
            alt="Volunteers"
            className="home-hero-img"
          />
          <h1 className="home-hero-title">
            Join the movement. Make a difference.
          </h1>
        </div>
      </section>

      {/* How it works */}
      <section className="home-section">
        <h2 className="home-section-title">How it works</h2>
        <div className="home-how-cards">
          <HowCard
            icon="🔍"
            title="Browse"
            desc="Discover volunteer opportunities by location and cause"
            onClick={() => navigate("/dashboard")}
          />
          <HowCard
            icon="➕"
            title="Sign Up"
            desc="Create an account to apply for volunteer roles"
          />
          <HowCard
            icon="📊"
            title="Track"
            desc="Monitor your volunteer hours and contributions"
            onClick={() => navigate("/contributions")}
          />
        </div>
      </section>

      {/* Success Stories */}
      <section className="home-section">
        <h2 className="home-section-title">Success Stories</h2>
        <div>
          <Story
            role="Volunteer, age 25"
            title="I found my passion through volunteering"
            desc="I was able to make a real impact in my community and connect with like-minded individuals"
            img="https://randomuser.me/api/portraits/men/32.jpg"
          />
          <Story
            role="Nonprofit, age 40"
            title="Volunteers helped us achieve our mission"
            desc="We were able to expand our programs and serve more people thanks to the hard work of our volunteers"
            img="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
          />
          <Story
            role="Volunteer, age 30"
            title="I gained valuable skills through volunteering"
            desc="I developed leadership abilities and learned how to work effectively as a team while volunteering"
            img="https://randomuser.me/api/portraits/women/44.jpg"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-links">
          <a href="#" className="home-footer-link">Home</a>
          <a href="#" className="home-footer-link">About</a>
          <a href="#" className="home-footer-link">Opportunities</a>
          <a href="#" className="home-footer-link">Contact</a>
        </div>
        <div className="home-footer-icons">
          <span className="home-footer-icon">🐦</span>
          <span className="home-footer-icon">🌐</span>
          <span className="home-footer-icon">📸</span>
          <span className="home-footer-icon">💼</span>
        </div>
        <div style={{ fontSize: 14 }}>@2022 Helping Hands</div>
      </footer>
    </div>
  );
}

// Helper Components
function HowCard({ icon, title, desc, onClick }) {
  return (
    <div
      className={
        "home-how-card" +
        (onClick ? " pointer" : " no-pointer")
      }
      onClick={onClick}
    >
      <div className="home-how-card-icon">{icon}</div>
      <div className="home-how-card-title">{title}</div>
      <div className="home-how-card-desc">{desc}</div>
    </div>
  );
}

function Story({ role, title, desc, img }) {
  return (
    <div className="home-story">
      <div className="home-story-info">
        <div className="home-story-role">{role}</div>
        <div className="home-story-title">{title}</div>
        <div className="home-story-desc">{desc}</div>
      </div>
      <img
        src={img}
        alt={title}
        className="home-story-img"
      />
    </div>
  );
}

export default HomePage;