import React, { useState, useEffect } from "react";
import { PresentTable } from "../components";
import { viewAll } from "../api/employee";

const PresentSchedule = () => {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [newOne, setNewOne] = useState(localStorage.getItem("Val"));
  console.log(newOne);

  useEffect(() => {
    //set loading to true
    setIsLoading(true);

    //set schedule variable
    setNewOne(localStorage.getItem("Val"));

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
      {newOne === true ? (
        <>
          <PresentTable data={employees} isLoading={isLoading} />
          <div className="text-center">
            <button
              className="btn btn-danger"
              onClick={() => {
                setNewOne(false);
                localStorage.setItem("Val", false);
              }}
            >
              نهاية اليوم
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h4 className="mb-3">إنشاء جدول حضور جديد</h4>
          <button
            className="btn btn-primary "
            onClick={() => {
              setNewOne(true);
              localStorage.setItem("Val", true);
            }}
          >
            إضافة جدول
          </button>
        </div>
      )}
    </section>
  );
};

export default PresentSchedule;
