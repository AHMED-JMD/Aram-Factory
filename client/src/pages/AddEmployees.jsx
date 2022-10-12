import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const AddEmployees = () => {
  const [value, setValue] = useState(null);
  return (
    <section className="add-employees">
      <form>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="pin">الإسم</InputLabel>
                <OutlinedInput
                  label="الإسم"
                  id="name-input"
                  type="text"
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="pin">الرقم التعريفي</InputLabel>
                <OutlinedInput
                  label="الرقم التعريفي"
                  id="id-input"
                  type="text"
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <HomeIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="pin">المسمى الوظيفي</InputLabel>
                <OutlinedInput
                  label="المسمى الوظيفي"
                  id="jobTitle-input"
                  type="text"
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <HomeIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="pin">الرقم الوطني</InputLabel>
                <OutlinedInput
                  label="الرقم الوطني"
                  id="nationalid-input"
                  type="text"
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="pin">رقم الجوال</InputLabel>
                <OutlinedInput
                  label="رقم الجوال"
                  id="phone-input"
                  type="phone"
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <PhoneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="تاريخ الميلاد"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="pin">الراتب</InputLabel>
                <OutlinedInput
                  label="الراتب"
                  id="salary-input"
                  type="number"
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <HomeIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4 pt-4">
              <FormControl style={{ width: "100%" }}>
                <Input
                  id="image-input"
                  type="file"
                  variant="standard"
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-12 mb-4">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="الملاحظات"
                className="pt-3 px-3"
                style={{
                  width: "100%",
                  background: "transparent",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div className="col-12 mb-4">
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%" }}
                fullWidth
              >
                تسجيل
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddEmployees;
