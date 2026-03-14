import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TalentLinkLogo from "../components/TalentLinkLogo";
import { register, sendOtp, verifyOtp, initiateLinkedInAuth } from "../services/authService";

type RegistrationMode = "otp" | "password";

function RegisterPage() {
  const navigate = useNavigate();

  // Shared state
  const [mode, setMode] = useState<RegistrationMode>("otp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Password mode state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP mode state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // ── LinkedIn ──────────────────────────────────────────────
  const handleLinkedIn = () => {
    initiateLinkedInAuth();
  };

  // ── OTP: Send Code ────────────────────────────────────────
  const handleSendOtp = async () => {
    setError(null);
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    try {
      setLoading(true);
      await sendOtp(email, name || undefined);
      setOtpSent(true);
      setResendCooldown(30);
      setSuccess("Verification code sent to your email.");
    } catch (err: any) {
      setError(err.message || "Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── OTP: Verify Code ─────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!otpCode || otpCode.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    try {
      setLoading(true);
      await verifyOtp(email, otpCode);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  // ── Password: Submit ──────────────────────────────────────
  const handlePasswordSubmit = async (e: React.FormEvent) => {
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
      await register(name, email, password);
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

  const handleChangeEmail = () => {
    setOtpSent(false);
    setOtpCode("");
    setError(null);
    setSuccess(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <TalentLinkLogo />

        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join TalentLink to start preparing</p>

        {/* LinkedIn Button */}
        <button type="button" style={styles.linkedinButton} onClick={handleLinkedIn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginRight: 10, flexShrink: 0 }}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Sign up with LinkedIn
        </button>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Mode Toggle */}
        <div style={styles.tabContainer}>
          <button
            type="button"
            style={mode === "otp" ? styles.tabActive : styles.tab}
            onClick={() => { setMode("otp"); setError(null); setSuccess(null); }}
          >
            Email Code
          </button>
          <button
            type="button"
            style={mode === "password" ? styles.tabActive : styles.tab}
            onClick={() => { setMode("password"); setError(null); setSuccess(null); }}
          >
            Email &amp; Password
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        {/* ── OTP Mode ────────────────────────────────────── */}
        {mode === "otp" && (
          !otpSent ? (
            <div style={styles.form}>
              <label style={styles.label}>
                Full Name (optional)
                <input
                  type="text"
                  style={styles.input}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <button
                type="button"
                style={{
                  ...styles.button,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                disabled={loading}
                onClick={handleSendOtp}
              >
                {loading ? "Sending..." : "Send Code"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} style={styles.form}>
              <p style={styles.otpInfo}>
                Code sent to <strong>{email}</strong>
              </p>
              <label style={styles.label}>
                Verification Code
                <input
                  type="text"
                  style={{ ...styles.input, textAlign: "center", letterSpacing: 8, fontSize: 22 }}
                  placeholder="000000"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  autoFocus
                />
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
                {loading ? "Verifying..." : "Verify & Create Account"}
              </button>
              <div style={styles.otpActions}>
                <button
                  type="button"
                  style={styles.linkButton}
                  onClick={handleSendOtp}
                  disabled={resendCooldown > 0 || loading}
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                </button>
                <button
                  type="button"
                  style={styles.linkButton}
                  onClick={handleChangeEmail}
                >
                  Change Email
                </button>
              </div>
            </form>
          )
        )}

        {/* ── Password Mode ───────────────────────────────── */}
        {mode === "password" && (
          <form onSubmit={handlePasswordSubmit} style={styles.form}>
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
          </form>
        )}

        <div style={styles.switchView}>
          <span style={styles.switchText}>Already have an account? </span>
          <a href="/login" style={styles.link}>
            Sign in
          </a>
        </div>
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
    marginBottom: 20,
    textAlign: "center",
  },
  linkedinButton: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    border: "none",
    background: "#0A66C2",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "#e5e7eb",
  },
  dividerText: {
    fontSize: 13,
    color: "#9ca3af",
    fontWeight: 500,
  },
  tabContainer: {
    display: "flex",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    overflow: "hidden",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: "10px 0",
    border: "none",
    background: "#f9fafb",
    color: "#6b7280",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: {
    flex: 1,
    padding: "10px 0",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
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
  otpInfo: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
  },
  otpActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: -4,
  },
  linkButton: {
    border: "none",
    background: "transparent",
    color: "#2563eb",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    padding: 0,
  },
  switchView: {
    textAlign: "center",
    marginTop: 20,
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
