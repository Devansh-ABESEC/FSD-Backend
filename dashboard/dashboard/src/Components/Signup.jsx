import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Signup successful!");

    navigate("/login");
  };

  return (

    <div className="signup-container">

      <div className="signup-box">

        <h1>🌈 Sign Up</h1>

        <p>Create your account</p>

        <form onSubmit={handleSubmit}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Create Account 🚀
          </button>

        </form>

        <p className="bottom-text">
          Already have an account?

          <button
            className="link-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </p>

      </div>

    </div>

  );
}

export default Signup;