import React from "react";

interface TalentLinkLogoProps {
  size?: "small" | "medium" | "large";
  showTagline?: boolean;
}

function TalentLinkLogo({ size = "medium", showTagline = true }: TalentLinkLogoProps) {
  const sizeMap = {
    small: { logo: 32, icon: 16, fontSize: 20 },
    medium: { logo: 48, icon: 20, fontSize: 32 },
    large: { logo: 64, icon: 24, fontSize: 40 },
  };

  const dimensions = sizeMap[size];

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        {/* Main Logo */}
        <svg
          width={dimensions.logo}
          height={dimensions.logo}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.logo}
        >
          <circle cx="12" cy="12" r="10" fill="#2563eb" opacity="0.1" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            fill="#2563eb"
          />
        </svg>

        {/* Face ID Icon Overlay */}
        <div
          style={{
            ...styles.faceIdIcon,
            width: dimensions.icon + 8,
            height: dimensions.icon + 8,
          }}
        >
          <svg
            width={dimensions.icon}
            height={dimensions.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"
              fill="#2563eb"
            />
            <path
              d="M8 14c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1z"
              fill="#2563eb"
            />
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              fill="#2563eb"
            />
          </svg>
        </div>
      </div>

      {/* Company Name */}
      <h1
        style={{
          ...styles.appName,
          fontSize: dimensions.fontSize,
        }}
      >
        TalentLink
      </h1>

      {/* Tagline */}
      {showTagline && (
        <p style={styles.tagline}>Your Interview Preparation Platform</p>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "relative",
    display: "inline-block",
    marginBottom: 12,
  },
  logo: {
    display: "block",
  },
  faceIdIcon: {
    position: "absolute",
    bottom: -4,
    right: -4,
    background: "#ffffff",
    borderRadius: "50%",
    padding: 4,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontWeight: 700,
    margin: "8px 0 4px 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
  },
  tagline: {
    fontSize: 14,
    color: "#6b7280",
    margin: 0,
    fontWeight: 400,
  },
};

export default TalentLinkLogo;
