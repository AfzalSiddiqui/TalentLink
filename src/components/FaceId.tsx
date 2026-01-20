import React, { useState } from "react";

interface FaceIdProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

function FaceId({ onSuccess, onError }: FaceIdProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFaceId = async () => {
    setIsScanning(true);
    setError(null);

    try {
      // Check if Face ID / Touch ID is available
      if (!("credentials" in navigator)) {
        throw new Error("Biometric authentication is not available on this device.");
      }

      // Simulate Face ID authentication
      // In a real app, you would use WebAuthn API or a biometric library
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success/failure
      if (Math.random() > 0.1) {
        onSuccess?.();
      } else {
        throw new Error("Face ID authentication failed. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.message || "Face ID authentication failed.";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.faceIdCircle}>
        {isScanning ? (
          <div style={styles.scanningAnimation}>
            <div style={{ ...styles.scanLine, top: "20%" }}></div>
            <div style={{ ...styles.scanLine, top: "50%", animationDelay: "0.5s" }}></div>
            <div style={{ ...styles.scanLine, top: "80%", animationDelay: "1s" }}></div>
          </div>
        ) : (
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
              fill="#2563eb"
            />
          </svg>
        )}
      </div>
      
      <h3 style={styles.title}>
        {isScanning ? "Scanning..." : "Face ID"}
      </h3>
      
      <p style={styles.subtitle}>
        {isScanning
          ? "Please look at your device"
          : "Use Face ID to quickly sign in"}
      </p>

      {error && <div style={styles.error}>{error}</div>}

      {!isScanning && (
        <button
          onClick={handleFaceId}
          style={styles.button}
          disabled={isScanning}
        >
          Authenticate with Face ID
        </button>
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
    padding: 32,
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  faceIdCircle: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "3px solid #ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    position: "relative",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },
  scanningAnimation: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
    animation: "scan 1.5s linear infinite",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    margin: "0 0 8px 0",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 8,
    padding: "12px 24px",
    borderRadius: 10,
    border: "2px solid #ffffff",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  error: {
    marginTop: 16,
    padding: "10px 14px",
    borderRadius: 8,
    background: "#fef2f2",
    color: "#b91c1c",
    fontSize: 13,
    border: "1px solid #fecaca",
    textAlign: "center",
    maxWidth: 300,
  },
};

export default FaceId;
