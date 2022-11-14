import React, { useEffect, useState } from "react";
import { Loader, SalariesRecordsTable, SalariesTable } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCheck, viewCheckout } from "../api/salaries";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

const SalariesRecords = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [data, setData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setIsLoading(true);

    //call db
    viewCheckout(params.id)
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const deleteItem = () => {
    setIsLoading(true);

    //call db
    deleteCheck(params.id)
      .then((res) => {
        setIsLoading(false);
        setDeleted(true);
        setErrMsg("");
        navigate("/salaries/records");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg(err.response.data);
      });
  };

  let names = [];
  let salaries = [];
  names.push(data.emp_names);
  salaries.push(data.emp_salaries);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            حذف الكشف
          </Typography>
          {isLoading && <Loader />}
          {deleted && (
            <div className="alert alert-success">تم حذف الكشف بنجاح</div>
          )}
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
          <div className="mt-2" style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => deleteItem()}
            >
              نعم
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="error"
              style={{ margin: "0 10px" }}
              onClick={handleClose}
            >
              لا
            </Button>
          </div>
        </Box>
      </Modal>

      <section className="salaries-records">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <h5 className="text-center">
            المجموع: <span>{data.total}</span> جنيه
          </h5>
          <h5 className="text-center">
            التاريخ: <span>{data.date}</span>
          </h5>
        </div>
        <div className="text-center">
          <IconButton aria-label="delete" onClick={handleOpen} className="mx-1">
            <DeleteIcon />
          </IconButton>
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
              {" "}
              الإسم{" "}
            </div>
            {data ? (
              data.emp_names ? (
                names[0].map((name) => (
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
                ))
              ) : (
                <Loader />
              )
            ) : null}
          </div>
          <div className="col px-0">
            <div
              className="p-2 mb-3"
              style={{ backgroundColor: "#ddd", fontSize: "14px" }}
            >
              صافي المرتب
            </div>
            {data ? (
              data.emp_salaries ? (
                salaries[0].map((name) => (
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
                ))
              ) : (
                <Loader />
              )
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default SalariesRecords;
