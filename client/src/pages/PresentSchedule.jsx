import React, { useState, useEffect } from "react";
import { PresentTable } from "../components";
import { viewAll } from "../api/employee";

const PresentSchedule = () => {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [newOne, setNewOne] = useState(false);
  console.log(employees);

  useEffect(() => {
    //set loading to true
    setIsLoading(true);

    //call db for data
    let page = 0;
    viewAll(page)
      .then((res) => {
        setIsLoading(false);
        //set data
        setEmployees(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <section className="employees">
      {newOne ? (
        <>
          {" "}
          <PresentTable />
          <br /> <br />
          <div className="text-center">
            {" "}
            <button
              className="btn btn-danger btn-lg"
              onClick={() => setNewOne(false)}
            >
              نهاية اليوم
            </button>
          </div>
        </>
      ) : (
        <div className="text-center display-4">
          حساب حضور جديد <br />
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setNewOne(true)}
          >
            جدول جديد
          </button>
        </div>
      )}
    </section>
  );
};

export default PresentSchedule;
