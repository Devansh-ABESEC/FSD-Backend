import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;