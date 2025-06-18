import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#fff", minHeight: "100vh" }}>
      {/* Top Bar */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem 2rem 0.5rem 2rem",
        borderBottom: "1px solid #eee",
        background: "#fff"
      }}>
        <Link to="/" style={{ fontSize: 22, color: "#222", textDecoration: "none", fontWeight: 600, marginRight: 24 }}>←</Link>
        <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>About Us</span>
      </nav>

      {/* Hero Section */}
      <section style={{ maxWidth: 1000, margin: "2rem auto 0", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ position: "relative" }}>
          <img
            src="https://img.freepik.com/free-vector/office-concept-illustration_114360-1403.jpg?w=900"
            alt="About Us"
            style={{ width: "100%", height: 220, objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", top: 30, left: 40, color: "#fff", maxWidth: 400
          }}>
            <div style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: 8 }}>
              Our mission is to connect people through lending to alleviate poverty.
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.5 }}>
              We believe everyone deserves a chance to succeed. Our platform empowers communities by connecting volunteers and organizations.
            </div>
          </div>
        </div>
      </section>

      {/* Meet our team */}
      <section style={{ maxWidth: 1000, margin: "2.5rem auto 0" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 18 }}>Meet our team</h2>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <TeamMember
            img="https://randomuser.me/api/portraits/men/11.jpg"
            name="Chris"
            role="CEO"
          />
          <TeamMember
            img="https://randomuser.me/api/portraits/women/12.jpg"
            name="Lena"
            role="COO"
          />
          <TeamMember
            img="https://randomuser.me/api/portraits/men/13.jpg"
            name="Lucas"
            role="CTO"
          />
          <TeamMember
            img="https://randomuser.me/api/portraits/women/14.jpg"
            name="Amanda"
            role="VP of Marketing"
          />
        </div>
      </section>

      {/* Impact Highlights */}
      <section style={{ maxWidth: 1000, margin: "2.5rem auto 0" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 18 }}>Impact Highlights</h2>
        <div style={{ display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
          <HighlightCard label="Total loans repaid" value="521" />
          <HighlightCard label="Total loans funded" value="678" />
        </div>
        <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
          <HighlightCard label="Repayment rate" value="98.7%" />
        </div>
        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.9rem 0",
            fontWeight: 600,
            fontSize: 16,
            width: 220,
            display: "block",
            margin: "0 auto"
          }}
        >
          Contact Us
        </button>
      </section>
    </div>
  );
}

function TeamMember({ img, name, role }) {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={img}
        alt={name}
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: 10,
          border: "2px solid #eee"
        }}
      />
      <div style={{ fontWeight: 600 }}>{name}, <span style={{ fontWeight: 400 }}>{role}</span></div>
    </div>
  );
}

function HighlightCard({ label, value }) {
  return (
    <div style={{
      flex: 1,
      minWidth: 220,
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: 12,
      padding: "1.2rem 1.5rem",
      textAlign: "left"
    }}>
      <div style={{ color: "#a1887f", fontWeight: 500, marginBottom: 8 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 22 }}>{value}</div>
    </div>
  );
}