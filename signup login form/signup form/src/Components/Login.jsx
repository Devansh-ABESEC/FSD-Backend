import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/login`, { email, password });
      sessionStorage.setItem("dashboardEmail", email);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "We couldn't sign you in. Check your details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-showcase" aria-label="Welcome">
        <Link className="brand" to="/login" aria-label="Northstar home">
          <span className="brand-mark">N</span> northstar
        </Link>
        <div className="showcase-copy">
          <span className="eyebrow">YOUR WORKSPACE, IN SYNC</span>
          <h1>Make room for your best work.</h1>
          <p>One thoughtful space to bring your projects, people, and plans together.</p>
          <div className="showcase-note"><span aria-hidden="true">✦</span> Clear your mind. Find your momentum.</div>
        </div>
        <div className="showcase-footer"><span>Designed for focused teams</span><span>© 2025 Northstar</span></div>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <div className="mobile-brand"><span className="brand-mark">N</span> northstar</div>
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to your account</h2>
          <p className="auth-description">Pick up right where you left off.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {errorMessage && <p className="form-message" role="alert">{errorMessage}</p>}
            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"} {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">New to Northstar? <Link to="/signup">Create an account</Link></p>
          <p className="auth-terms">By continuing, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </section>
    </main>
  );
}

export default Login;
