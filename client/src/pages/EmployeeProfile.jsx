import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkIcon from "@mui/icons-material/Work";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  updateEmployee,
  updateGrant,
  updateImage,
  viewOne,
} from "../api/employee";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EmployeeProfile = () => {
  const params = useParams();

  //employees state
  const [empData, setEmpData] = useState({});
  //grant state
  const [grantData, setGrantData] = useState({});
  //file state
  const [file, setFile] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //use effect function to get employee data
  useEffect(() => {
    setIsLoading(true);

    //call db and get data
    viewOne(params.id)
      .then((res) => {
        setEmpData(res.data.employee);
        setGrantData(res.data.grant);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  //handle change for employee basic info
  const handleChange = (e) => {
    const new_value = e.target.value;
    setEmpData({ ...empData, [e.target.name]: new_value });
  };

  //handle change for grant data
  const handlChange2 = (e) => {
    const newVal = e.target.value;
    setGrantData({ ...grantData, [e.target.name]: newVal });
  };

  //on submit basic data
  const handleSubmit = (e) => {
    setIsLoading(true);

    e.preventDefault();

    //data to server
    updateEmployee(empData)
      .then((res) => {
        setIsLoading(false);
        setIsAdded(true);
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsAdded(false);
        setErrMsg(err.response.data);
      });
  };

  //on submit image
  const handleSubmitPhoto = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let data = new FormData();
    data.append("emp_id", params.id);
    data.append("file", file);
    //send to database
    updateImage(data)
      .then((res) => {
        setIsLoading(false);
        setIsAdded(true);
        console.log(res.data);
      })
      .catch((err) => {
        setErrMsg(err.response.data);
        setIsLoading(false);
      });
  };

  //on submit image
  const handleSubmitGrant = (e) => {
    e.preventDefault();
    //prepare data
    let emp_id = params.id;
    let data = { grantData, emp_id };

    //send to database
    updateGrant(data)
      .then((res) => {
        setIsLoading(false);
        setIsAdded(true);
        console.log(res.data);
      })
      .catch((err) => {
        setErrMsg(err.response.data);
        setIsLoading(false);
      });
  };

  return (
    <section className="add-employees">
      <form>
        <div className="container">
          <div className="row mr-auto text-right">
            <Typography variant="h5" component="h1" mb={2}>
              البيانات الأساسية
            </Typography>
            <div className="col-12 d-flex justify-content-center mb-4">
              <Avatar
                alt="Remy Sharp"
                src="https://picsum.photos/seed/picsum/200/200"
                sx={{ width: 150, height: 150 }}
              />
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="الإسم"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="emp_name"
                  type="text"
                  value={empData.emp_name}
                  onChange={handleChange}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="الرقم التعريفي"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  name="emp_id"
                  type="number"
                  value={empData.emp_id}
                  onChange={handleChange}
                  require="true"
                  endadornment={
                    <InputAdornment position="end">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="المسمى الوظيفي"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="jobTitle"
                  type="text"
                  value={empData.jobTitle}
                  onChange={handleChange}
                  require="true"
                  endadornment={
                    <InputAdornment position="end">
                      <WorkIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="الرقم الوطني"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="Ssn"
                  type="number"
                  value={empData.Ssn}
                  onChange={handleChange}
                  require="true"
                  endadornment={
                    <InputAdornment position="end">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="السكن"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="address"
                  type="text"
                  value={empData.address}
                  onChange={handleChange}
                  require="true"
                  endadornment={
                    <InputAdornment position="end">
                      <HomeIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="رقم الجوال"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="phoneNum"
                  type="phone"
                  value={empData.phoneNum}
                  onChange={handleChange}
                  require="true"
                  endadornment={
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
                    name="start_date"
                    value={empData.start_date}
                    onChange={handleChange}
                    inputFormat="YYYY/MM/DD"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="تاريخ بداية الخدمة"
                    name="app_date"
                    value={empData.app_date}
                    onChange={handleChange}
                    inputFormat="YYYY/MM/DD"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="الراتب"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="salary"
                  type="number"
                  value={empData.salary}
                  onChange={handleChange}
                  require="true"
                  endadornment={
                    <InputAdornment position="end">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="الخصم عند الغياب"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="penalty"
                  type="number"
                  value={empData.penalty}
                  onChange={handleChange}
                  require="true"
                  endadornment={
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
                name="notes"
                placeholder="الملاحظات"
                label="الملاحظات"
                value={empData.notes}
                onChange={handleChange}
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
                type="submit"
                onClick={handleSubmit}
                style={{ width: "100%" }}
                fullWidth
              >
                حفظ
              </Button>
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
            <div className="col-12 mb-4">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmitPhoto}
                style={{ width: "100%" }}
                fullWidth
              >
                حفظ
              </Button>
            </div>
            <Typography variant="h5" component="h1" mb={2}>
              المنح
            </Typography>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="الإضافي"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="extra"
                  type="number"
                  value={grantData.extra}
                  onChange={handlChange2}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="منحة رئاسية 2017"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="grant17"
                  type="number"
                  value={grantData.grant17}
                  onChange={handlChange2}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="منحة خاصة 2019"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="grant19"
                  type="number"
                  value={grantData.grant19}
                  onChange={handlChange2}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="منحة العام 2020"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="grant20"
                  type="number"
                  value={grantData.grant20}
                  onChange={handlChange2}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="منحة العام 2022"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="grant22"
                  type="number"
                  value={grantData.grant22}
                  onChange={handlChange2}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="منحة المدير العام"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="grantGM"
                  type="number"
                  value={grantData.grantGM}
                  onChange={handlChange2}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-lg-6 col-sm-12 mb-4">
              <FormControl style={{ width: "100%" }}>
                <TextField
                  name="insurance"
                  label="التأمين"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="insurance-input"
                  type="number"
                  value={grantData.insurance}
                  onChange={handlChange2}
                  require="true"
                />
              </FormControl>
            </div>
            <div className="col-12 mb-4">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmitGrant}
                style={{ width: "100%" }}
                fullWidth
              >
                حفظ
              </Button>
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

export default EmployeeProfile;
