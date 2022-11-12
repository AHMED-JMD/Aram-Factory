import React, { useState } from "react";
import axios from "axios";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { forgetPassword } from "../api/userUtilities";

const ConfirmEmail = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const HandleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    //call database
    forgetPassword(email)
      .then((res) => {
        setIsAdded(true);
        setIsLoading(false);
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
            تأكيد الايميل
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
              <div className="alert alert-success">تم ارسال الايميل بنجاح</div>
            </>
          )}
          <br />
          <form onSubmit={(e) => HandleSubmit(e)}>
            <div className="form-group">
              <TextField
                id="outlined-basic"
                className="din"
                style={{ marginBottom: "20px", width: "320px" }}
                label="الايميل"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
