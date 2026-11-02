import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Login successful!");

    navigate("/dashboard");
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>👋 Welcome Back</h1>

        <p>Login to your account</p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login 🚀
          </button>

        </form>

        <p className="bottom-text">

          Don't have an account?

          <button
            className="link-button"
            onClick={() => navigate("/")}
          >
            Sign Up
          </button>

        </p>

      </div>

    </div>

  );
}

export default Login;