import React, { useState, useEffect } from "react";
import { Loader, PresentRecordsTable, PresentTable } from "../components";
import { viewAll } from "../api/employee";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { findByDate } from "../api/attendance";

const PresentRecords = () => {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [errMsg, setErrMsg] = React.useState("");

  const AbsentTable = (date) => {
    setIsLoading(true);

    //call backend
    findByDate(date)
      .then((res) => {
        setIsLoading(false);
        setErrMsg("")
        setEmployees(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg(err.response.data);
        setEmployees({})
      });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="employees">
      <>
        <div className="mb-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="قم بإختبار تاريخ السجل"
              value={date}
              onChange={(date) => {
                setDate(date);
              }}
              onAccept={AbsentTable}
              inputFormat="YYYY-MM-DD"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
          <br />
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
        </div>
         <div
          className="row align-items-stretch flex-nowrap text-nowrap mx-auto py-2"
          style={{
            maxWidth: "800px",
            backgroundColor: "#fff",
            overflowX: "scroll",
          }}
        >
          <div className="col-9 px-0">
            <div
              className="p-2 mb-3"
              style={{ backgroundColor: "#ddd", fontSize: "14px" }}
            >
              الإسم
            </div>
            {employees &&
                employees?.emp_names?.map((name) => (
                  <div
                    className="p-2 mb-3"
                    style={{
                      borderBottom: "1px solid #f7f7f7",
                      fontSize: "14px",
                    }}
                    key={name}
                  >
                    {name}
                  </div>
                ))}
          </div>
          <div className="col px-0">
            <div
              className="p-2 mb-3"
              style={{ backgroundColor: "#ddd", fontSize: "14px" }}
            >
             المسمى الوظيفي
            </div>
            {employees &&
                employees?.emp_Jobs?.map((name) => (
                  <div
                    className="p-2 mb-3"
                    style={{
                      borderBottom: "1px solid #f7f7f7",
                      fontSize: "14px",
                    }}
                    key={name}
                  >
                    {" "}
                    {name}{" "}
                  </div>
                ))}
          </div>
          </div>
        {/* <PresentRecordsTable data={employees} /> */}
      </>
    </section>
  );
};

export default PresentRecords;
