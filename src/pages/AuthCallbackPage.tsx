import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { storeAuthToken } from "../services/authService";

function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError("Authentication failed. Redirecting to register...");
      setTimeout(() => navigate("/register"), 2000);
      return;
    }

    if (token) {
      storeAuthToken(token);
      navigate("/dashboard", { replace: true });
    } else {
      setError("No authentication token received. Redirecting to register...");
      setTimeout(() => navigate("/register"), 2000);
    }
  }, [searchParams, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <div style={styles.loaderWrapper}>
            <div className="auth-spinner" />
            <p style={styles.text}>Completing sign-in...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 440,
    background: "#ffffff",
    borderRadius: 16,
    padding: "40px 32px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  loaderWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  text: {
    fontSize: 16,
    color: "#374151",
  },
  error: {
    padding: "12px 14px",
    borderRadius: 10,
    background: "#fef2f2",
    color: "#b91c1c",
    fontSize: 14,
    border: "1px solid #fecaca",
  },
};

export default AuthCallbackPage;
