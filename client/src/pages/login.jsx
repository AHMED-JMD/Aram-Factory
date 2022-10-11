import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const HandleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    let data = { username, password };

    axios
      .post("/user/auth", data)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg(err.response.data);
      });
  };

  return (
    <div className="Login">
      <div className="wrap">
        <div className="box">
          <Typography
            variant="h4"
            color="primary"
            className="din"
            my={2}
            component="h1"
          >
            مصنع إرم للمواد الغذائية
          </Typography>
          <Typography variant="h6" className="din">
            لوحة التحكم
          </Typography>
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
              <div className="alert alert-danger">{errMsg.msg}</div>
            </>
          )}
          <br />
          <form onSubmit={(e) => HandleSubmit(e)}>
            <div className="form-group">
              {/* <label htmlFor="name">الاسم</label> <br /> */}
              {/* <input
                type="text"
                className="textfeild"
                placeholder="ادخل الاسم"
              /> */}
              <TextField
                id="outlined-basic"
                className="din"
                style={{ marginBottom: "20px", width: "320px" }}
                label="إسم المستخدم"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              {/* <label htmlFor="name">كلمة السر</label> <br />
              <input
                type="password"
                className="textfeild"
                placeholder="ادخل كلمة السر"
              /> */}
              <TextField
                id="outlined-basic"
                className="din"
                style={{ width: "320px" }}
                label="كلمة المرور"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div>
              {" "}
              نسيت كلمة السر؟ <a href="/">اضغط هنا</a>
            </div>
            <br />
            <Button
              type="submit"
              color="primary"
              size="large"
              variant="contained"
            >
              تسجيل الدخول
            </Button>
          </form>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
            <path
              fill="#00cba9"
              fillOpacity="1"
              d="M0,256L120,250.7C240,245,480,235,720,197.3C960,160,1200,96,1320,64L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
