import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Your passwords don't match. Please try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/signup`, { name, email, password });
      navigate("/login", { replace: true, state: { email } });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "We couldn't create your account. Please try again.",
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
          <span className="eyebrow">A BETTER WAY TO WORK</span>
          <h1>Good things happen when everything clicks.</h1>
          <p>Get your projects out of your head and into a space where your whole team can move forward.</p>
          <div className="showcase-note"><span aria-hidden="true">✦</span> Your next chapter starts here.</div>
        </div>
        <div className="showcase-footer"><span>Designed for focused teams</span><span>© 2025 Northstar</span></div>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap signup-form-wrap">
          <div className="mobile-brand"><span className="brand-mark">N</span> northstar</div>
          <span className="eyebrow">GET STARTED — IT&apos;S FREE</span>
          <h2>Create your account</h2>
          <p className="auth-description">Bring your next great idea to life.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-name">Full name</label>
            <input id="signup-name" type="text" autoComplete="name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} required />
            <label htmlFor="signup-email">Email address</label>
            <input id="signup-email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" type="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
            <label htmlFor="signup-confirm-password">Confirm password</label>
            <input id="signup-confirm-password" type="password" autoComplete="new-password" placeholder="Enter your password again" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
            {errorMessage && <p className="form-message" role="alert">{errorMessage}</p>}
            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"} {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
          <p className="auth-terms">By continuing, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </section>
    </main>
  );
}

export default Signup;
