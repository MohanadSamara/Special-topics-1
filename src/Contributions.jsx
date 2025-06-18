import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      borderBottom: "1px solid #eee",
      background: "#fff"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>VolunteerMatch</div>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
        <li><Link to="/" style={navLink}>Home</Link></li>
        <li><Link to="/opportunities" style={navLink}>Find Opportunities</Link></li>
      </ul>
      <div>
        <button style={loginBtn}>Log in</button>
        <button style={signupBtn} onClick={() => navigate("/sign up")}>Sign up</button>
      </div>
    </nav>
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

export default function Contributions() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`http://localhost:5000/api/contributions?user_id=${user.id}`);
        const data = await res.json();
        setContributions(data);
      } catch (err) {
        setContributions([]);
      }
      setLoading(false);
    }
    fetchContributions();
  }, [user.id]);

  // Calculate total events attended
  const totalEvents = contributions.length;

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#fff" }}>
      <NavBar />
      <div style={{ maxWidth: 900, margin: "2.5rem auto 0" }}>
        <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 28 }}>My Contributions</h1>
        
        {/* Summary Cards */}
        <div style={{ display: "flex", gap: 24, marginBottom: 28 }}>
          <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            padding: "2rem",
            textAlign: "center"
          }}>
            <div style={{ color: "#a1887f", fontWeight: 500, marginBottom: 8 }}>Events Attended</div>
            <div style={{ fontWeight: 700, fontSize: 32 }}>{totalEvents}</div>
          </div>
        </div>

        {/* Contributions Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
        ) : contributions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#a1887f" }}>
            No contributions found. Start by joining opportunities!
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              marginTop: 16,
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)"
            }}>
              <thead>
                <tr>
                  <th style={{
                    background: "#f9f4ef",
                    color: "#8d6e63",
                    fontWeight: 600,
                    fontSize: 18,
                    padding: "1rem",
                    textAlign: "left",
                    borderBottom: "2px solid #f3e7d9"
                  }}>Event Name</th>
                  <th style={{
                    background: "#f9f4ef",
                    color: "#8d6e63",
                    fontWeight: 600,
                    fontSize: 18,
                    padding: "1rem",
                    textAlign: "left",
                    borderBottom: "2px solid #f3e7d9"
                  }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c, idx) => (
                  <tr key={c.id || idx}>
                    <td style={{
                      padding: "0.9rem 1rem",
                      fontSize: 16,
                      color: "#222",
                      borderBottom: "1px solid #f3e7d9"
                    }}>{c.event_name || `Event ${idx + 1}`}</td>
                    <td style={{
                      padding: "0.9rem 1rem",
                      fontSize: 16,
                      color: "#4CAF50",
                      fontWeight: 500,
                      borderBottom: "1px solid #f3e7d9"
                    }}>Completed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}