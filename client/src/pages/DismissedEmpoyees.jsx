import React, { useContext, useEffect, useState } from "react";
import { view } from "../api/archive";
import { viewAll } from "../api/employee";
import { DismissTable } from "../components";
import { authContext } from "../context/AuthContext";

const DismissedEmployees = () => {
  let { auth } = useContext(authContext);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //set loading to true
    setIsLoading(true);

    //call db for data
    view()
      .then((res) => {
        setIsLoading(false);
        setEmployees(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [auth.isAuthenticated]);
  return (
    <section className="employees">
      <DismissTable employeeData={employees} />
    </section>
  );
};

export default DismissedEmployees;
