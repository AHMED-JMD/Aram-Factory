import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Employees from "./pages/Employees";
import { authContext } from "./context/AuthContext";
import { Header, ProtectedRoute, Sidebar } from "./components";
import AddEmployees from "./pages/AddEmployees";
import PresentSchedule from "./pages/PresentSchedule";
function App() {
  const { isAuthenticated } = useContext(authContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className="App" dir="rtl">
      {isAuthenticated && <Header toggleFunc={handleDrawerToggle} />}
      <Stack direction="row" spacing={1}>
        {isAuthenticated && (
          <Sidebar open={mobileOpen} close={handleDrawerToggle} />
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Employees />} />
          <Route path="/add-employees" element={<AddEmployees />} />
          {/* <Route path="/view-employees/:id" element={<AddEmployees />} /> */}
          <Route path="/present-schedule" element={<PresentSchedule />} />
        </Routes>
      </Stack>
    </div>
  );
}

export default App;
