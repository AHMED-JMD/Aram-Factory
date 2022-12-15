import React, { useState, useEffect } from "react";
import { Loader, PresentTable } from "../components";
import { viewAll } from "../api/employee";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const PresentRecords = () => {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  useEffect(() => {
    //set loading to true
    setIsLoading(true);

    //call db for data
    viewAll()
      .then((res) => {
        setIsLoading(false);
        //set data
        setEmployees(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

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
              inputFormat="YYYY/MM/DD"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        {/* <PresentTable data={employees} isLoading={isLoading} /> */}
      </>
    </section>
  );
};

export default PresentRecords;
