import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import TalentLinkLogo from "../components/TalentLinkLogo";

function SettingsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
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
          <h1 style={styles.title}>Settings</h1>

          {/* Preferences Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Preferences</h3>
            <div style={styles.settingsCard}>
              <div style={styles.settingRow}>
                <div style={styles.settingInfo}>
                  <div style={styles.settingLabel}>Notifications</div>
                  <div style={styles.settingDescription}>
                    Receive push notifications
                  </div>
                </div>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    style={styles.toggleInput}
                  />
                  <span style={{
                    ...styles.toggleSlider,
                    ...(notificationsEnabled ? styles.toggleSliderChecked : {}),
                  }}>
                    <span style={{
                      ...styles.toggleSliderThumb,
                      ...(notificationsEnabled ? styles.toggleSliderThumbChecked : {}),
                    }} />
                  </span>
                </label>
              </div>

              <div style={styles.divider} />

              <div style={styles.settingRow}>
                <div style={styles.settingInfo}>
                  <div style={styles.settingLabel}>Dark Mode</div>
                  <div style={styles.settingDescription}>Use dark theme</div>
                </div>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={darkModeEnabled}
                    onChange={(e) => setDarkModeEnabled(e.target.checked)}
                    style={styles.toggleInput}
                  />
                  <span style={{
                    ...styles.toggleSlider,
                    ...(darkModeEnabled ? styles.toggleSliderChecked : {}),
                  }}>
                    <span style={{
                      ...styles.toggleSliderThumb,
                      ...(darkModeEnabled ? styles.toggleSliderThumbChecked : {}),
                    }} />
                  </span>
                </label>
              </div>

              <div style={styles.divider} />

              <div style={styles.settingRow}>
                <div style={styles.settingInfo}>
                  <div style={styles.settingLabel}>Location Services</div>
                  <div style={styles.settingDescription}>
                    Allow location access
                  </div>
                </div>
                <label style={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={locationEnabled}
                    onChange={(e) => setLocationEnabled(e.target.checked)}
                    style={styles.toggleInput}
                  />
                  <span style={{
                    ...styles.toggleSlider,
                    ...(locationEnabled ? styles.toggleSliderChecked : {}),
                  }}>
                    <span style={{
                      ...styles.toggleSliderThumb,
                      ...(locationEnabled ? styles.toggleSliderThumbChecked : {}),
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Account</h3>
            <div style={styles.settingsCard}>
              <button style={styles.settingButton}>
                <span>Edit Profile</span>
                <span style={styles.arrow}>›</span>
              </button>
              <div style={styles.divider} />
              <button style={styles.settingButton}>
                <span>Change Password</span>
                <span style={styles.arrow}>›</span>
              </button>
              <div style={styles.divider} />
              <button style={styles.settingButton}>
                <span>Privacy Settings</span>
                <span style={styles.arrow}>›</span>
              </button>
            </div>
          </div>

          {/* About Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>About</h3>
            <div style={styles.settingsCard}>
              <div style={styles.settingRow}>
                <div style={styles.settingLabel}>App Version</div>
                <div style={styles.settingValue}>1.0.0</div>
              </div>
              <div style={styles.divider} />
              <button style={styles.settingButton}>
                <span>Terms of Service</span>
                <span style={styles.arrow}>›</span>
              </button>
              <div style={styles.divider} />
              <button style={styles.settingButton}>
                <span>Privacy Policy</span>
                <span style={styles.arrow}>›</span>
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div style={styles.section}>
            <button style={styles.logoutButton}>
              Log Out
            </button>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 16,
  },
  settingsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  settingValue: {
    fontSize: 16,
    fontWeight: 600,
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    margin: "8px 0",
  },
  toggle: {
    position: "relative",
    display: "inline-block",
    width: 52,
    height: 28,
    cursor: "pointer",
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  toggleSlider: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#cbd5e1",
    borderRadius: 28,
    transition: "0.3s",
  },
  toggleSliderChecked: {
    backgroundColor: "#667eea",
  },
  toggleSliderThumb: {
    position: "absolute",
    height: 22,
    width: 22,
    left: 3,
    bottom: 3,
    backgroundColor: "white",
    borderRadius: "50%",
    transition: "0.3s",
  },
  toggleSliderThumbChecked: {
    transform: "translateX(24px)",
  },
  settingButton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    background: "transparent",
    border: "none",
    fontSize: 16,
    fontWeight: 500,
    color: "#111827",
    cursor: "pointer",
    textAlign: "left",
  },
  arrow: {
    fontSize: 24,
    color: "#9ca3af",
    fontWeight: 300,
  },
  logoutButton: {
    width: "100%",
    padding: "16px",
    borderRadius: 10,
    border: "1px solid #ef4444",
    background: "#ffffff",
    color: "#ef4444",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

export default SettingsPage;
