import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./compoents/user/login";
import Dashboard from "./compoents/dashboard/dashboard";
function App() {
  return (
    <div className="App" dir="rtl">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
