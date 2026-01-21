import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import TalentLinkLogo from "../components/TalentLinkLogo";

function ProfilePage() {
  const [isMenuOpen, setIsMenuOpen] =  useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
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
          <h1 style={styles.title}>Profile</h1>

          {/* Profile Header */}
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              <span style={styles.avatarText}>JD</span>
            </div>
            <div>
              <h2 style={styles.name}>John Doe</h2>
              <p style={styles.email}>john.doe@example.com</p>
            </div>
          </div>

          {/* Personal Information */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Phone</label>
                <p style={styles.infoValue}>+1 (555) 123-4567</p>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Location</label>
                <p style={styles.infoValue}>San Francisco, CA</p>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Member Since</label>
                <p style={styles.infoValue}>January 2024</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Statistics</h3>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statValue}>24</div>
                <div style={styles.statLabel}>Applications</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statValue}>156</div>
                <div style={styles.statLabel}>Profile Views</div>
              </div>
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
    maxWidth: 800,
    margin: "0 auto",
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 32,
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    padding: 32,
    backgroundColor:  "#ffffff",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "4px solid #ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 700,
    color: "#ffffff",
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#6b7280",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 16,
  },
  infoGrid: {
    display: "grid",
    gap: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  infoItem: {
    paddingBottom: 16,
    borderBottom: "1px solid #e5e7eb",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#6b7280",
    marginBottom: 4,
    display: "block",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 600,
    color: "#111827",
    margin: 0,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  statValue: {
    fontSize: 36,
    fontWeight: 700,
    color: "#667eea",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#6b7280",
  },
};

export default ProfilePage;
