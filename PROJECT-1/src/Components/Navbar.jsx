import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
    fontFamily: 'sans-serif',
  };

  const brandStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2d3748',
    textDecoration: 'none',
  };

  const linksContainerStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const getLinkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#007bff' : '#4a5568',
    fontWeight: location.pathname === path ? '600' : '500',
    padding: '8px 16px',
    borderRadius: '6px',
    backgroundColor: location.pathname === path ? '#e7f1ff' : 'transparent',
    transition: 'all 0.2s ease',
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>
        My App
      </Link>
      <div style={linksContainerStyle}>
        <Link to="/" style={getLinkStyle('/')}>
          Dashboard
        </Link>
        <Link to="/login" style={getLinkStyle('/login')}>
          Login
        </Link>
        <Link to="/signup" style={getLinkStyle('/signup')}>
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
