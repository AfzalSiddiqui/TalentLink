import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Home" },
    { path: "/profile", label: "Profile" },
    { path: "/settings", label: "Settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={styles.overlay}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          ...styles.drawer,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div style={styles.drawerHeader}>
          <h2 style={styles.drawerTitle}>Menu</h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav style={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.menuItem,
                ...(isActive(item.path) ? styles.menuItemActive : {}),
              }}
              onClick={onClose}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
    transition: "opacity 0.3s ease",
  },
  drawer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 280,
    height: "100vh",
    backgroundColor: "#ffffff",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
    zIndex: 999,
    transition: "transform 0.3s ease",
    overflowY: "auto",
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e5e7eb",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
  },
  closeButton: {
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: 24,
    cursor: "pointer",
    padding: 0,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    transition: "background 0.2s",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
  },
  menuItem: {
    display: "block",
    padding: "16px 24px",
    color: "#374151",
    textDecoration: "none",
    fontSize: 16,
    fontWeight: 500,
    transition: "all 0.2s",
    borderLeft: "3px solid transparent",
  },
  menuItemActive: {
    color: "#667eea",
    backgroundColor: "#f3f4f6",
    borderLeftColor: "#667eea",
    fontWeight: 600,
  },
};

export default HamburgerMenu;
