import { Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Employees from "./pages/Employees";
import { authContext } from "./context/AuthContext";
import { Header, ProtectedRoute, Sidebar } from "./components";
import AddEmployees from "./pages/AddEmployees";
import PresentSchedule from "./pages/PresentSchedule";
import EmployeeProfile from "./pages/EmployeeProfile";
import Salaries from "./pages/Salaries";
import SalariesRecords from "./pages/SalariesRecords";
import Archieve from "./pages/Archieve";
import PastSalaries from "./pages/PastSalaries";
import ConfirmEmail from "./pages/confirmEmail";
import ResetPassword from "./pages/resetPassword";
import DismissedEmployees from "./pages/DismissedEmpoyees";
import PresentRecords from "./pages/PresentRecords";
import Borrows from "./pages/Borrows";
import HomePage from "./pages/HomePage";

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

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/employees" element={<Employees />} />
            <Route path="/archieve" element={<Archieve />} />
            <Route path="/borrows" element={<Borrows />} />
            <Route
              path="/dismissed-employees"
              element={<DismissedEmployees />}
            />
            <Route path="/add-employees" element={<AddEmployees />} />
            <Route path="/employees/:id" element={<EmployeeProfile />} />
            <Route path="/present-schedule" element={<PresentSchedule />} />
            <Route
              path="/present-schedule/records"
              element={<PresentRecords />}
            />
            <Route path="/salaries" element={<Salaries />} />
            <Route path="/salaries/records" element={<PastSalaries />} />
            <Route path="/salaries/records/:id" element={<SalariesRecords />} />
          </Route>
        </Routes>
      </Stack>
    </div>
  );
}

export default App;
