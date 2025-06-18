import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [role, setRole] = useState("Volunteer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orgName, setOrgName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    let organization_id = null;

    // If registering as Organization, create/find organization first
    if (role === "Organization" && orgName) {
      // Try to create organization
      try {
        const orgRes = await fetch("http://localhost:5000/api/organizations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: orgName })
        });
        const orgData = await orgRes.json();
        organization_id = orgData.id;
      } catch (err) {
        setError("Failed to create organization.");
        return;
      }
    }

    // Register user
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          phone,
          role,
          organization_id
        })
      });
      if (!res.ok) {
        setError("Sign up failed. Try a different email.");
        return;
      }
      navigate("/login");
    } catch (err) {
      setError("Sign up failed.");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f0ea",
      padding: "2rem 0"
    }}>
      <div style={{
        maxWidth: 520,
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
            <button style={getStartedBtn} onClick={() => navigate("/")}>Home</button>
            <button style={signInBtn} onClick={() => navigate("/login")}>Sign In</button>
          </div>
        </nav>

        <h2 style={{ fontWeight: 700, fontSize: "1.3rem", marginBottom: 24 }}>Sign Up</h2>
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
          <div style={{ marginBottom: 18 }}>
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
          <div style={{ marginBottom: 18 }}>
            <button
              type="button"
              style={{
                ...roleBtn,
                background: role === "Volunteer" ? "#fff" : "#f7f3ef",
                border: role === "Volunteer" ? "2px solid #ff9800" : "1px solid #eee",
                color: "#ff9800",
                marginRight: 10
              }}
              onClick={() => setRole("Volunteer")}
            >
              Volunteer
            </button>
            <button
              type="button"
              style={{
                ...roleBtn,
                background: role === "Organization" ? "#fff" : "#f7f3ef",
                border: role === "Organization" ? "2px solid #ff9800" : "1px solid #eee",
                color: "#ff9800"
              }}
              onClick={() => setRole("Organization")}
            >
              Organization
            </button>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              placeholder="Your Name"
              style={inputStyle}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="text"
              placeholder="(123) 456-7890"
              style={inputStyle}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Organization Name</label>
            <input
              type="text"
              placeholder="Your Organization Name"
              style={inputStyle}
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              disabled={role !== "Organization"}
              required={role === "Organization"}
            />
          </div>
          <button type="submit" style={signUpBtn}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

const getStartedBtn = {
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "0.4rem 1.2rem",
  fontWeight: 600,
  marginRight: 8,
  cursor: "pointer"
};

const signInBtn = {
  background: "#fff",
  color: "#222",
  border: "1px solid #eee",
  borderRadius: 8,
  padding: "0.4rem 1.2rem",
  fontWeight: 600,
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

const roleBtn = {
  padding: "0.4rem 1.1rem",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  outline: "none"
};

const signUpBtn = {
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