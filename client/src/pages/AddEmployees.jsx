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
  Typography,
} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WorkIcon from '@mui/icons-material/Work';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addEmployee } from "../api/employee";
import { Title } from "@mui/icons-material";
const AddEmployees = () => {
  const [value, setValue] = useState(null);
  const [emp_id, setEmp_id] = useState("");
  const [emp_name, setEmp_name] = useState("");
  const [address, setAddress] = useState("");
  const [Ssn, setSsn] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [start_date, setStart_date] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);

    e.preventDefault();

    //form data for server
    const data = new FormData();
    data.append("emp_id", emp_id);
    data.append("emp_name", emp_name);
    data.append("Ssn", Ssn);
    data.append("jobTitle", jobTitle);
    data.append("salary", salary);
    data.append("phoneNum", phoneNum);
    data.append("start_date", start_date);
    data.append("address", address);
    data.append("notes", notes);
    data.append("file", file);

    //data to server
    addEmployee(data)
      .then((res) => {
        setIsLoading(false);
        setIsAdded(true);
        console.log(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsAdded(false);
        setErrMsg(err.response.data);
      });
  };
  return (
    <section className="add-employees">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <Typography variant="h5" component="h1" mb={2}>
            البيانات الأساسية
          </Typography>
          <div className="row">
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="pin">الإسم</InputLabel>
                <OutlinedInput
                  label="الإسم"
                  id="name-input"
                  type="text"
                  value={emp_name}
                  onChange={(e) => setEmp_name(e.target.value)}
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <PersonIcon />
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
                  value={emp_id}
                  onChange={(e) => setEmp_id(e.target.value)}
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <AssignmentIndIcon />
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
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <WorkIcon />
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
                  value={Ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="pin">السكن</InputLabel>
                <OutlinedInput
                  label="السكن"
                  id="address-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                <InputLabel htmlFor="pin">رقم الجوال</InputLabel>
                <OutlinedInput
                  label="رقم الجوال"
                  id="phone-input"
                  type="phone"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
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
                    label="تاريخ التعيين"
                    value={start_date}
                    onChange={(start_date) => {
                      setStart_date(start_date);
                    }}
                    inputFormat="YYYY/MM/DD"
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
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  require="true"
                  endAdornment={
                    <InputAdornment position="end">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-12 mb-4">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                placeholder="الملاحظات"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="pt-3 px-3"
                style={{
                  width: "100%",
                  background: "transparent",
                  borderRadius: "4px",
                }}
              />
            </div>
            <Typography variant="h5" component="h1" mb={2}>
            الصورة الشخصية
          </Typography>
          <div className="col-12 mb-4 pt-4">
              <FormControl style={{ width: "100%" }}>
                <Input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  variant="standard"
                  require="true"
                />
              </FormControl>
            </div>
            <Typography variant="h5" component="h1" mb={2}>
            المنح
          </Typography>
          <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel>الإضافي</InputLabel>
                <OutlinedInput
                  label="الإضافي"
                  id="extra-input"
                  type="number"
                  // value={}
                  // onChange={}
                  require="true"
                />
              </FormControl>
            </div>
          <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel>منحة رئاسية 2017</InputLabel>
                <OutlinedInput
                  label="منحة رئاسية 2017"
                  id="2017-input"
                  type="number"
                  // value={}
                  // onChange={}
                  require="true"
                />
              </FormControl>
            </div>
          <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel>منحة خاصة 2019</InputLabel>
                <OutlinedInput
                  label="منحة خاصة 2019"
                  id="2019-input"
                  type="number"
                  // value={}
                  // onChange={}
                  require="true"
                />
              </FormControl>
            </div>
          <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel>منحة العام 2020</InputLabel>
                <OutlinedInput
                  label="منحة العام 2020"
                  id="2020-input"
                  type="number"
                  // value={}
                  // onChange={}
                  require="true"
                />
              </FormControl>
            </div>
          <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel>منحة العام 2022</InputLabel>
                <OutlinedInput
                  label="منحة العام 2022"
                  id="2022-input"
                  type="number"
                  // value={}
                  // onChange={}
                  require="true"
                />
              </FormControl>
            </div>
          <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel>منحة المدير العام</InputLabel>
                <OutlinedInput
                  label="منحة المدير العام"
                  id="manager-input"
                  type="number"
                  // value={}
                  // onChange={}
                  require="true"
                />
              </FormControl>
            </div>
          <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <InputLabel>خصم التأمين</InputLabel>
                <OutlinedInput
                  label="خصم التأمين"
                  id="insurance-input"
                  type="number"
                  // value={}
                  // onChange={}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-12 mb-4">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ width: "100%" }}
                fullWidth
              >
                تسجيل
              </Button>

              {/* here is design for the loading and the message */}
              {isLoading && (
                <div className="text-center">
                  <div
                    className="spinner-grow  text-primary"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {errMsg && (
                <>
                  <br />
                  <br />
                  <div className="alert alert-danger">{errMsg}</div>
                </>
              )}
              {isAdded && (
                <>
                  <br />
                  <br />
                  <div className="alert alert-success">
                    تمت اضافة الموظف بنجاح
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddEmployees;
