import React, { useEffect, useState } from "react";
import { viewAll } from "../api/employee";
import { EmployeesTable } from "../components";

const Employees = () => {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(employees);

  useEffect(() => {
    //set loading to true
    setIsLoading(true);

    //call db for data
    viewAll()
      .then((res) => {
        setIsLoading(false);
        setEmployees(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <section className="employees">
      <EmployeesTable />
    </section>
  );
};

export default Employees;
