import React, { useState, useEffect } from "react";
import { Loader, PresentRecordsTable, PresentTable } from "../components";
import { viewAll } from "../api/employee";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { findByDate } from "../api/attendance";

const PresentRecords = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  const AbsentTable = (date) => {
    setIsLoading(true);

    //call backend
    findByDate(date)
      .then((res) => {
        setIsLoading(false);
        setErrMsg("");
        setEmployees(res.data);
        setIsSelected(true);
      })
      .catch((err) => {
        setIsSelected(false);
        setIsLoading(false);
        setErrMsg(err.response.data);
        setEmployees({});
      });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="employees">
      <>
        <div>
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
        {isSelected && (
          <PresentRecordsTable employees={employees} date={date} />
        )}
      </>
    </section>
  );
};

export default PresentRecords;
