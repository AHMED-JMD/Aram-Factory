import React, { useContext, useEffect, useState } from "react";
import { viewAll } from "../api/employee";
import { EmployeesTable, Loader } from "../components";
import { authContext } from "../context/AuthContext";

const Employees = () => {
  let { auth } = useContext(authContext);
  const [employees, setEmployees] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(employees);

  useEffect(() => {
    //set loading to true
    setIsLoading(true);

    //call db for data
    let page = 0;
    viewAll(page)
      .then((res) => {
        setIsLoading(false);
        setEmployees(res.data.employees);
        setCount(res.data.count);
      })
      .catch((err) => {
        setIsLoading(false);
        // console.log(err);
      });
  }, [auth.isAuthenticated]);

  if(isLoading){
    return <Loader />
  }
  return (
    <section className="employees">
      <EmployeesTable employeeData={employees} />
    </section>
  );
};

export default Employees;
