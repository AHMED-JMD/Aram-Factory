import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Employees from "./pages/Employees";
import { authContext } from "./context/AuthContext";
import { Header, ProtectedRoute, SalariesRecordsTable, Sidebar } from "./components";
import AddEmployees from "./pages/AddEmployees";
import PresentSchedule from "./pages/PresentSchedule";
import EmployeeProfile from "./pages/EmployeeProfile";
import Salaries from "./pages/Salaries";
import SalariesRecords from "./pages/SalariesRecords";
import Archieve from "./pages/Archieve";
import PastSalaries from "./pages/PastSalaries";
import ConfirmEmail from "./pages/confirmEmail";
import ResetPassword from "./pages/resetPassword";

function App() {
  const { auth } = useContext(authContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className="App" dir="rtl">
      {auth.isAuthenticated && <Header toggleFunc={handleDrawerToggle} />}
      <Stack direction="row" spacing={1}>
        {auth.isAuthenticated && (
          <Sidebar open={mobileOpen} close={handleDrawerToggle} />
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ConfirmEmail />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />

          {/* <Route element={<ProtectedRoute isAuthenticated={auth.isAuthenticated} />}> */}
          <Route path="/" element={<Employees />} exact />
          <Route path="/archieve" element={<Archieve />} />
          <Route path="/add-employees" element={<AddEmployees />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/present-schedule" element={<PresentSchedule />} />
          <Route path="/salaries" element={<Salaries />} />
          <Route path="/salaries/past-salaries" element={<PastSalaries />} />
          <Route path="/salaries/records/:id" element={<SalariesRecords />} />
          {/* </Route> */}
        </Routes>
      </Stack>
    </div>
  );
}

export default App;
