import axiosClient from "./axiosClient";

const warning = async (emp_ids) => {
  try {
    let response = await axiosClient.post("/employees/warnings", {
      emp_ids,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const getWarn = async () => {
  try {
    let response = await axiosClient.get("/employees/warnings");
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const returnWarn = async (emp_ids) => {
  try {
    let response = await axiosClient.post("/employees/warnings/return", {
      emp_ids,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

export { warning , getWarn, returnWarn};
