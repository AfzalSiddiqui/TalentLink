import React, { useState } from "react";
import TalentLinkLogo from "../components/TalentLinkLogo";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <TalentLinkLogo />
        
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join TalentLink to start preparing</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Full Name
            <input
              type="text"
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label style={styles.label}>
            Email
            <input
              type="email"
              style={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label style={styles.label}>
            Password
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                style={{ ...styles.input, paddingRight: 80 }}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                style={styles.toggleButton}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label style={styles.label}>
            Confirm Password
            <div style={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                style={{ ...styles.input, paddingRight: 80 }}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={styles.toggleButton}
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <div style={styles.switchView}>
            <span style={styles.switchText}>Already have an account? </span>
            <a href="/login" style={styles.link}>
              Sign in
            </a>
          </div>
        </form>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    margin: "24px 0 8px 0",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: "#374151",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    height: 44,
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    padding: "0 14px",
    fontSize: 15,
    outline: "none",
    transition: "all 0.2s",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  toggleButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    fontSize: 13,
    fontWeight: 500,
    color: "#2563eb",
    cursor: "pointer",
    padding: 4,
  },
  button: {
    marginTop: 8,
    height: 48,
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  error: {
    marginBottom: 8,
    padding: "12px 14px",
    borderRadius: 10,
    background: "#fef2f2",
    color: "#b91c1c",
    fontSize: 14,
    border: "1px solid #fecaca",
  },
  success: {
    marginBottom: 8,
    padding: "12px 14px",
    borderRadius: 10,
    background: "#f0fdf4",
    color: "#166534",
    fontSize: 14,
    border: "1px solid #bbf7d0",
  },
  switchView: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
  },
  switchText: {
    color: "#6b7280",
  },
  link: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
  },
};

export default RegisterPage;
