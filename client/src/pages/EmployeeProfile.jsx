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
  Box,
  Modal,
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
  //mpdal data here
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  //employees state
  const [empData, setEmpData] = useState({});
  //grant state
  const [grantData, setGrantData] = useState({});
  //file state
  const [file, setFile] = useState("");

  const [errMsgEmp, setErrMsgEmp] = useState("");
  const [errMsgImg, setErrMsgImg] = useState("");
  const [errMsgGrant, setErrMsgGrant] = useState("");

  const [isAddedEmp, setIsAddedEmp] = useState(false);
  const [isAddedGrant, setIsAddedGrant] = useState(false);
  const [isAddedImg, setIsAddedImg] = useState(false);

  const [isLoading, setIsLoading] = useState();
  const [isLoadingEmp, setIsLoadingEmp] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [isLoadingGrant, setIsLoadingGrant] = useState(false);

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
    setIsLoadingEmp(true);

    e.preventDefault();

    //data to server
    updateEmployee(empData)
      .then((res) => {
        setIsLoadingEmp(false);
        setIsAddedEmp(true);
        setErrMsgEmp("");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setIsLoadingEmp(false);
        setIsAddedEmp(false);
        setErrMsgEmp(err.response.data);
      });
  };

  //on submit image
  const handleSubmitPhoto = (e) => {
    e.preventDefault();
    setIsLoadingImg(true);

    let data = new FormData();
    data.append("emp_id", params.id);
    data.append("file", file);
    //send to database
    updateImage(data)
      .then((res) => {
        setIsLoadingImg(false);
        setIsAddedImg(true);
        setErrMsgImg("");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setErrMsgImg(err.response.data);
        setIsLoadingImg(false);
      });
  };

  //on submit grant
  const handleSubmitGrant = (e) => {
    e.preventDefault();
    setIsLoadingGrant(true);

    //prepare data
    let emp_id = params.id;
    let data = { grantData, emp_id };

    //send to database
    updateGrant(data)
      .then((res) => {
        setIsLoadingGrant(false);
        setIsAddedGrant(true);
        setErrMsgGrant("");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        setErrMsgGrant(err.response.data);
        setIsLoadingGrant(false);
      });
  };

  return (
    <section className="add-employees">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            حذف موظف
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 1 }}>
            هل انت متأكد من حذف:
          </Typography>
          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              style={{ margin: "0 10px" }}
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
      <form>
        <div className="container">
          <div className="row mr-auto text-right">
            <Typography variant="h5" component="h1" mb={2}>
              البيانات الأساسية
            </Typography>
            <div className="col-12 d-flex justify-content-center mb-4">
              <Avatar
                alt="Remy Sharp"
                src={`/images/${empData.imgLink}`}
                sx={{ width: 150, height: 150 }}
                onClick={handleOpen}
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

              {isLoadingEmp && (
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
              {errMsgEmp && (
                <>
                  <br />
                  <br />
                  <div className="alert alert-danger">{errMsgEmp}</div>
                </>
              )}
              {isAddedEmp && (
                <>
                  <br />
                  <br />
                  <div className="alert alert-success">
                    تمت تعديل البيانات الاساسية بنجاح
                  </div>
                </>
              )}

              {/* ---------------------------- */}
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
              <span
                className="my-2"
                style={{ fontSize: "14px", fontWeight: "100" }}
              >
                *يفضل أن تكون الصورة بمقاسات مربعة
              </span>
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

              {isLoadingImg && (
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
              {errMsgImg && (
                <>
                  <br />
                  <br />
                  <div className="alert alert-danger">{errMsgImg}</div>
                </>
              )}
              {isAddedImg && (
                <>
                  <br />
                  <br />
                  <div className="alert alert-success">
                    تمت تعديل الصورة بنجاح
                  </div>
                </>
              )}

              {/* ------------------------------ */}
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
              {isLoadingGrant && (
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
              {errMsgGrant && (
                <>
                  <br />
                  <br />
                  <div className="alert alert-danger">{errMsgGrant}</div>
                </>
              )}
              {isAddedGrant && (
                <>
                  <br />
                  <br />
                  <div className="alert alert-success">
                    تمت تعديل بيانات المنح بنجاح
                  </div>
                </>
              )}
            </div>
            <div className="col-12 mb-4">
              <Typography variant="h5" component="h1" mb={2}>
                أيام الغياب
              </Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={2}
                name="absent_dates"
                placeholder="لا يوجد أيام غياب"
                label="أيام الغياب"
                value={empData.absent_date}
                disabled
                className="pt-3 px-3"
                style={{
                  width: "100%",
                  background: "transparent",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EmployeeProfile;
