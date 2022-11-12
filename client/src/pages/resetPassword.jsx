import React, { useState } from "react";
import axios from "axios";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { resetPassword, verifyLink } from "../api/userUtilities";
import { useEffect } from "react";

const ResetPassword = () => {
  let params = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [verified, setVerified] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    //call database
    verifyLink(params.token, params.id)
      .then((res) => {
        setIsLoading(false);
        setVerified(true);
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setVerified(false);
        setErrMsg(err.response.data);
      });
  }, []);

  const HandleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    //call to db
    resetPassword(newPassword, params.id)
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
            تغيير كلمة السر
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
          {isAdded && (
            <>
              <br />
              <div className="alert alert-success">
                <p>تم تغيير كلمة السر بنجاح</p>
                <Link className="btn btn-warning" to={"/login"}>
                  تسجيل الدخول
                </Link>
              </div>
            </>
          )}
          <br />
          {verified ? (
            <form onSubmit={(e) => HandleSubmit(e)}>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  className="din"
                  style={{ marginBottom: "20px", width: "320px" }}
                  label="كلمة المرور الجديدة"
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <br />
              <Button
                type="submit"
                color="primary"
                size="large"
                variant="contained"
              >
                تأكيد
              </Button>
            </form>
          ) : (
            <div className="alert alert-danger">الرابط غير صالح للاستخدام </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
