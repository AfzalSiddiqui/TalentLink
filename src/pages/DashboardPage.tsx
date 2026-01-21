import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import TalentLinkLogo from "../components/TalentLinkLogo";

function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button
            style={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            ☰
          </button>
          <TalentLinkLogo />
        </div>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.content}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Welcome to TalentLink</p>

          <div style={styles.cards}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>My Profile</h3>
              <p style={styles.cardText}>View and edit your profile information</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Settings</h3>
              <p style={styles.cardText}>Manage your account settings</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  menuButton: {
    background: "transparent",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    padding: "8px",
    borderRadius: 8,
    color: "#374151",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#374151",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  main: {
    padding: "32px 24px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 32,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#6b7280",
  },
};

export default DashboardPage;
