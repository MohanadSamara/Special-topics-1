import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Top Navigation Bar Component
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

// Sidebar links with routing
const sidebarLinks = [
  { icon: "🏠", label: "Dashboard", to: "/dashboard" },
  { icon: "🔍", label: "Opportunities", to: "/opportunities" },
  { icon: "📊", label: "Contributions", to: "/contributions" },
  { icon: "👤", label: "Profile", to: "#" },
  { icon: "🚪", label: "Logout", to: "#" },
];

const upcomingEvents = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
    title: "Volunteer at the Community Food Bank",
    date: "Jan 3, 2023",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
    title: "Trail Cleanup - Help Keep Our Trails Beautiful",
    date: "Jan 8, 2023",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/616/616491.png",
    title: "Aid the Homeless - Volunteer at Our Shelter",
    date: "Jan 14, 2023",
  },
];

const recommended = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
    title: "Community Park Cleanup",
    subtitle: "Community Park Cleanup",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
    title: "Assist Local Seniors with Yard Work",
    subtitle: "Assist Local Seniors with Yard Work",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/616/616491.png",
    title: "Help Prepare and Serve Meals at Our Soup Kitchen",
    subtitle: "Help Prepare and Serve Meals at Our Soup Kitchen",
  },
];

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", minHeight: "100vh", background: "#fff" }}>
        {/* Sidebar */}
        <aside style={{
          width: 220,
          background: "#fff",
          borderRight: "1px solid #f2ede7",
          padding: "2rem 0.5rem 0 0",
          minHeight: "100vh"
        }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {sidebarLinks.map((link, i) => (
              <li key={link.label}>
                {link.to && link.to !== "#" ? (
                  <Link
                    to={link.to}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "0.7rem 1.2rem",
                      borderRadius: 10,
                      background: i === 0 ? "#f8f6f3" : "none",
                      color: "#222",
                      fontWeight: i === 0 ? 600 : 400,
                      textDecoration: "none",
                      marginBottom: 4,
                      fontSize: 16,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{link.icon}</span>
                    {link.label}
                  </Link>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "0.7rem 1.2rem",
                      borderRadius: 10,
                      color: "#222",
                      fontWeight: 400,
                      marginBottom: 4,
                      fontSize: 16,
                      cursor: "not-allowed",
                      opacity: 0.6
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{link.icon}</span>
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "2.5rem 3rem" }}>
          <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 28 }}>Dashboard</h1>

          {/* Upcoming Events */}
          <section>
            <h2 style={sectionTitle}>Upcoming events</h2>
            {upcomingEvents.map(ev => (
              <div key={ev.title} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <img src={ev.img} alt="" style={{ width: 40, height: 40, borderRadius: 8, marginRight: 16, background: "#f2ede7" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{ev.title}</div>
                  <div style={{ color: "#a1887f", fontSize: 13 }}>{ev.date}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Recommended Opportunities */}
          <section style={{ marginTop: 32 }}>
            <h2 style={sectionTitle}>Recommended opportunities</h2>
            {recommended.map(ev => (
              <div key={ev.title} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <img src={ev.img} alt="" style={{ width: 40, height: 40, borderRadius: 8, marginRight: 16, background: "#f2ede7" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{ev.title}</div>
                  <div style={{ color: "#a1887f", fontSize: 13 }}>{ev.subtitle}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Contribution Summary */}
          <section style={{ marginTop: 32 }}>
            <h2 style={sectionTitle}>Contribution Summary</h2>
            <div style={{ maxWidth: 400 }}>
              <SummaryRow label="Hours Volunteered" value="100" />
              <SummaryRow label="Events Attended" value="10" />
              <SummaryRow label="Total Contributions" value="$1,000" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", padding: "0.5rem 0",
      borderBottom: "1px solid #f2ede7", fontSize: 15
    }}>
      <span style={{ color: "#8d6e63" }}>{label}</span>
      <span style={{ color: "#222", fontWeight: 600 }}>{value}</span>
    </div>
  );
}

const sectionTitle = {
  fontWeight: 600,
  fontSize: 17,
  marginBottom: 10,
  marginTop: 0,
};