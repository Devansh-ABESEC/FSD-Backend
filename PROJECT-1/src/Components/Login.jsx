import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };
    const res = await axios.post('http://localhost:5000/api/users/login', userData);

    alert(res.data);

    if (res.data === 'Login successful') {
      setUser({ email });
      navigate('/');
    }
  };



  const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
      <p style={{ marginTop: '10px' }}>
        <Link to="/">← Back to Home</Link>
      </p>
    </div>
  );
};

export default Login;
