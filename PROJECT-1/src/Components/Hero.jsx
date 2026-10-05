import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ user }) => {
  const containerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    backgroundColor: '#ffffff',
  };

  const detailBoxStyle = {
    marginTop: '25px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textAlign: 'left',
  };

  const buttonStyle = {
    display: 'inline-block',
    margin: '10px 5px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  };

  const signupBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
  };

  const hasUserData = Boolean(user && (user.name || user.email));

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#1a202c', marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ color: '#718096', marginBottom: '20px' }}>
        Welcome to your account overview
      </p>

      {hasUserData ? (
        <div>
          <div style={detailBoxStyle}>
            <h3 style={{ margin: '0 0 15px 0', color: '#2d3748' }}>
              👤 User Details
            </h3>
            <p style={{ margin: '8px 0', fontSize: '16px', color: '#4a5568' }}>
              <strong>Name:</strong> {user.name || 'Not provided'}
            </p>
            <p style={{ margin: '8px 0', fontSize: '16px', color: '#4a5568' }}>
              <strong>Email:</strong> {user.email || 'Not provided'}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ ...detailBoxStyle, textAlign: 'center' }}>
            <p style={{ color: '#718096', margin: '10px 0' }}>
              No user details found. 
            </p>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Link to="/signup" style={signupBtnStyle}>
              Sign Up
            </Link>
            <Link to="/login" style={buttonStyle}>
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
