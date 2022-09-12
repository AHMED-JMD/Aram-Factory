import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./compoents/admin/login";

function App() {
  return (
    <div className="App" dir="rtl">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
