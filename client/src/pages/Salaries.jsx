import React, { useEffect, useState } from "react";
import { viewSchedule } from "../api/salaries";
import { SalariesTable } from "../components";

const Salaries = () => {
  const [newOne, setNewOne] = useState(false);
  const [employee, setEmployee] = useState({});
  console.log(employee);
  const [isloading, setIsloading] = useState(false);
  const [ErrMsg, setErrMsg] = useState("");

  useEffect(() => {
    setIsloading(true);

    //set variable for the schedule
    setNewOne(localStorage.getItem("Sal"));
    //call db data
    viewSchedule()
      .then((res) => {
        setIsloading(false);
        setEmployee(res);
      })
      .catch((err) => {
        setIsloading(false);
        setErrMsg(err.response.data);
        console.log(err);
      });
  }, []);

  return (
    <section className="salaries">
      {newOne && newOne !== "false" ? (
        <>
          <SalariesTable />
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
