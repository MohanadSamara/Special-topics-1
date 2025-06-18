import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// NavBar Component (same as HomePage)
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
      <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>Helping Hands</div>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
        <li><Link to="/" style={navLink}>Home</Link></li>
        <li><Link to="#" style={navLink}>About</Link></li>
        <li><Link to="/opportunities" style={navLink}>Opportunities</Link></li>
        <li><Link to="#" style={navLink}>Contact</Link></li>
      </ul>
      <div>
        <button style={loginBtn}>Login</button>
        <button style={signupBtn} onClick={() => navigate("/sign up")}>Sign Up</button>
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

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetch("http://localhost:5000/api/opportunities")
      .then(res => res.json())
      .then(data => setOpportunities(data))
      .catch(() => setOpportunities([]));
  }, []);

  const handleJoin = async (opportunity) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch("http://localhost:5000/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          opportunity_id: opportunity.id
        })
      });
      if (!res.ok) throw new Error("Failed to join opportunity");
      setJoined(true);
    } catch (err) {
      console.error("Join error:", err);
      // Optionally show error to user
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#fff", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar Filters */}
        <aside style={{
          width: 240,
          background: "#faf6f2",
          borderRight: "1px solid #f2ede7",
          padding: "2rem 1.5rem 0 2rem",
          minHeight: "100vh"
        }}>
          <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 24 }}>Filter & Sort</h3>
          <Filter label="Date" />
          <Filter label="Category" />
          <Filter label="Distance" />
          <Filter label="Organization" />
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "2.5rem 3rem" }}>
          {!selected && !joined && (
            <>
              <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 8 }}>Find volunteer opportunities</h1>
              <div style={{ color: "#a1887f", marginBottom: 18, fontSize: 15 }}>
                {opportunities.length} opportunities found.
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                <FilterTag label="All Dates" />
                <FilterTag label="All Categories" />
                <FilterTag label="Anywhere" />
                <FilterTag label="All Organizations" />
              </div>
              {opportunities.map((op, idx) => (
                <div key={op.id || idx} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 32,
                  background: "#fff"
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#a1887f", fontSize: 15, marginBottom: 2 }}>
                      {op.organization_id ? `Organization #${op.organization_id}` : "Unknown Organization"}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 18 }}>{op.title}</div>
                    <div style={{ color: "#a1887f", fontSize: 15, marginBottom: 8 }}>{op.date}</div>
                    <button style={detailsBtn} onClick={() => setSelected(op)}>View details</button>
                  </div>
                  {/* No image in DB, so show a placeholder */}
                  <div style={{
                    width: 180,
                    height: 110,
                    background: "#eee",
                    borderRadius: 12,
                    marginLeft: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#bbb",
                    fontSize: 32
                  }}>
                    👐
                  </div>
                </div>
              ))}
            </>
          )}

          {selected && !joined && (
            <div style={{
              maxWidth: 800,
              margin: "2.5rem auto",
              background: "#fff",
              borderRadius: 12,
              padding: "2.5rem 2.5rem 2rem 2.5rem",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)"
            }}>
              <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 18 }}>{selected.title}</h1>
              <div style={{ color: "#444", fontSize: 17, marginBottom: 24 }}>{selected.description}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Date</div>
              <div style={{ color: "#222" }}>{selected.date}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Location</div>
              <div style={{ color: "#222" }}>{selected.location}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Organization ID</div>
              <div style={{ color: "#ff9800", marginBottom: 32 }}>{selected.organization_id}</div>
              {/* Only show Join button if user is Volunteer */}
              {user.role === "Volunteer" ? (
                <button
                  style={signupBtnFull}
                  onClick={async () => {
                    await fetch("http://localhost:5000/api/contributions", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        user_id: user.id,
                        opportunity_id: selected.id
                      })
                    });
                    setJoined(true);
                  }}
                >
                  Join
                </button>
              ) : (
                <div style={{ color: "#a1887f", fontWeight: 600, marginTop: 18 }}>
                  Only volunteers can join opportunities.
                </div>
              )}
              <div style={{ marginTop: 24 }}>
                <button style={backBtn} onClick={() => setSelected(null)}>Back to Opportunities</button>
              </div>
            </div>
          )}

          {joined && (
            <div style={{
              maxWidth: 600,
              margin: "3rem auto",
              background: "#fff",
              borderRadius: 12,
              padding: "2.5rem 2.5rem 2rem 2.5rem",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)"
            }}>
              <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 28, textAlign: "center" }}>
                Thank you! You're signed up.
              </h1>
              <button
                style={signupBtnFull}
                onClick={() => {
                  setJoined(false);
                  setSelected(null);
                  navigate("/dashboard");
                }}
              >
                Return to dashboard
              </button>
              <button
                style={moreBtn}
                onClick={() => {
                  setJoined(false);
                  setSelected(null);
                }}
              >
                View more opportunities
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Filter({ label }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 6 }}>{label}</div>
      <select style={{
        width: "100%",
        padding: "0.5rem",
        borderRadius: 8,
        border: "1px solid #e0d7ce",
        background: "#f7f3ef",
        color: "#6d6d6d"
      }}>
        <option>All {label.toLowerCase()}s</option>
      </select>
    </div>
  );
}

function FilterTag({ label }) {
  return (
    <span style={{
      background: "#f7f3ef",
      color: "#8d6e63",
      borderRadius: 16,
      padding: "0.4rem 1.1rem",
      fontSize: 15,
      fontWeight: 500
    }}>{label}</span>
  );
}

const detailsBtn = {
  background: "#f7f3ef",
  color: "#6d4c41",
  border: "none",
  borderRadius: 8,
  padding: "0.5rem 1.2rem",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 15
};

const signupBtnFull = {
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "0.7rem 0",
  fontWeight: 600,
  fontSize: 18,
  width: "100%",
  marginTop: 18,
  cursor: "pointer"
};

const moreBtn = {
  background: "#f7f3ef",
  color: "#222",
  border: "none",
  borderRadius: 8,
  padding: "0.7rem 0",
  fontWeight: 600,
  fontSize: 16,
  width: "100%",
  marginTop: 12,
  cursor: "pointer"
};

const backBtn = {
  background: "#fff",
  color: "#ff9800",
  border: "1px solid #ff9800",
  borderRadius: 8,
  padding: "0.5rem 1.2rem",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer"
};