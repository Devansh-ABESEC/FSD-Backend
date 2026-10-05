import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [user, setUser] = useState({ name: '', email: '' });

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero user={user} setUser={setUser} />} />
        <Route path="/dashboard" element={<Hero user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
