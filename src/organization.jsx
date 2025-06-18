import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Organization() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: ""
  });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.title || !form.date || !form.location || !form.description) {
      setError("All fields are required.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.organization_id) {
      setError("You must be logged in as an organization.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          organization_id: user.organization_id
        })
      });
      if (!res.ok) {
        setError("Failed to add opportunity.");
        return;
      }
      const newEvent = await res.json();
      setEvents([...events, newEvent]);
      setForm({ title: "", date: "", location: "", description: "" });
    } catch (err) {
      setError("Failed to add opportunity.");
    }
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#fff", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #eee",
        background: "#fff"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>Helping Hands</div>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          <li><a href="/" style={navLink}>Home</a></li>
          <li><a href="/about us" style={navLink}>About</a></li>
          <li><a href="/opportunities" style={navLink}>Opportunities</a></li>
          <li><a href="/organization" style={navLink}>Organization</a></li>
        </ul>
        <div>
          <button style={loginBtn} onClick={() => navigate("/login")}>Login</button>
          <button style={signupBtn} onClick={() => navigate("/sign up")}>Sign Up</button>
        </div>
      </nav>

      <div style={{ maxWidth: 600, margin: "2.5rem auto 0", padding: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 18 }}>Add Opportunity/Event</h1>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ marginBottom: 36 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Event Title"
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Location"
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
              placeholder="Describe the opportunity"
              required
            />
          </div>
          <button type="submit" style={ctaBtn}>Add Opportunity</button>
        </form>

        <h2 style={{ fontWeight: 600, fontSize: "1.2rem", marginBottom: 16 }}>Your Opportunities</h2>
        {events.length === 0 && (
          <div style={{ color: "#a1887f", fontSize: 16 }}>No opportunities added yet.</div>
        )}
        {events.map((event, idx) => (
          <div key={idx} style={eventCard}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{event.title}</div>
            <div style={{ color: "#ff9800", fontWeight: 500, margin: "6px 0" }}>
              {event.date} | {event.location}
            </div>
            <div style={{ color: "#6d6d6d", fontSize: 15 }}>{event.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const navLink = { color: "#222", textDecoration: "none", fontWeight: 500, fontSize: "1rem" };
const loginBtn = {
  background: "#fff", color: "#ff9800", border: "1px solid #ff9800",
  borderRadius: 6, padding: "0.4rem 1.2rem", fontWeight: 600, marginRight: 8, cursor: "pointer"
};
const signupBtn = {
  background: "#ff9800", color: "#fff", border: "none",
  borderRadius: 6, padding: "0.4rem 1.2rem", fontWeight: 600, cursor: "pointer"
};
const ctaBtn = {
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "0.7rem 2.5rem",
  fontWeight: 700,
  fontSize: 17,
  cursor: "pointer"
};
const labelStyle = {
  display: "block",
  fontWeight: 600,
  marginBottom: 6,
  fontSize: 15
};
const inputStyle = {
  width: "100%",
  padding: "0.7rem",
  borderRadius: 8,
  border: "1px solid #eee",
  background: "#faf6f2",
  fontSize: 15,
  marginBottom: 0
};
const eventCard = {
  background: "#faf6f2",
  border: "1px solid #eee",
  borderRadius: 12,
  padding: "1.2rem",
  marginBottom: 18
};