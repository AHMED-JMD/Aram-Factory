import React, { useContext, useEffect, useState } from "react";
import { viewAll } from "../api/employee";
import { ArchieveTable } from "../components";
import { authContext } from "../context/AuthContext";

const Archieve = () => {
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
  return (
    <section className="employees">
      <ArchieveTable employeeData={employees} />
    </section>
  );
};

export default Archieve;
