import React, { useState, useEffect } from "react";
import { Loader, PresentTable } from "../components";
import { viewAll } from "../api/employee";

const PresentSchedule = () => {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [newOne, setNewOne] = useState(false);

  useEffect(() => {
    //set loading to true
    setIsLoading(true);

    //set schedule variable
    setNewOne(localStorage.getItem("Val"));

    //call db for data
    viewAll()
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="employees">
      {newOne && newOne !== "false" ? (
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
