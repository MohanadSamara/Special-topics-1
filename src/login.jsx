import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }
      const user = await res.json();
      // After successful login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError("Login failed.");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f0ea",
      padding: "2rem 0"
    }}>
      <div style={{
        maxWidth: 420,
        margin: "2.5rem auto",
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        padding: "2.5rem 2.5rem 2rem 2.5rem"
      }}>
        {/* Navbar */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32
        }}>
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            <span style={{
              display: "inline-block",
              width: 10,
              height: 10,
              background: "#222",
              borderRadius: "50%",
              marginRight: 8,
              verticalAlign: "middle"
            }}></span>
            VolunteerMatch
          </div>
          <div>
            <button style={navBtn} onClick={() => navigate("/")}>Home</button>
            <button style={navBtn} onClick={() => navigate("/sign up")}>Sign Up</button>
          </div>
        </nav>

        <h2 style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: 24 }}>Sign In</h2>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="youremail@example.com"
              style={inputStyle}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="********"
              style={inputStyle}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={loginBtn}>Sign In</button>
        </form>
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <span style={{ color: "#a1887f", fontSize: 15 }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#ff9800", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/sign up")}
            >
              Sign Up
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

const navBtn = {
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "0.4rem 1.2rem",
  fontWeight: 600,
  marginRight: 8,
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

const loginBtn = {
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "0.7rem 0",
  fontWeight: 600,
  fontSize: 17,
  width: "100%",
  cursor: "pointer"
};