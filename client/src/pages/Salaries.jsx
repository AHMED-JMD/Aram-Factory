import React, { useEffect, useState } from "react";
import { viewSchedule } from "../api/salaries";
import { Loader, SalariesTable } from "../components";

const Salaries = () => {
  const [newOne, setNewOne] = useState(false);
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState("");

  useEffect(() => {
    setIsLoading(true);

    //set variable for the schedule
    setNewOne(localStorage.getItem("Sal"));
    //call db data
    viewSchedule()
      .then((res) => {
        setIsLoading(false);
        setEmployee(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg(err.response.data);
        console.log(err);
      });
  }, []);

  if(isLoading){
    return <Loader />;
  }
  return (
    <section className="salaries">
      {newOne && newOne !== "false" ? (
        <>
          <SalariesTable employeeData={employee} isLoading={isLoading} />
        </>
      ) : (
        <div className="text-center">
          <h4 className="mb-3">إنشاء كشف حسابات جديد</h4>
          <button
            className="btn btn-primary "
            onClick={() => {
              setNewOne(true);
              localStorage.setItem("Sal", true);
            }}
          >
            إضافة الكشف
          </button>
        </div>
      )}
    </section>
  );
};

export default Salaries;
