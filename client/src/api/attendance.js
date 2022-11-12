import axiosClient from "./axiosClient";

const absent = async (ids, date) => {
  try {
    let response = await axiosClient.post("/employees/absence", {
      ids,
      date,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

const nwMonth = async () => {
  try {
    let response = await axiosClient.get("/employees/new-month");
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

const borrow = async (emp_id, amount) => {
  try {
    let response = await axiosClient.post("/employees/borrow", {
      emp_id,
      amount,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
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

export { absent, nwMonth, borrow, warning };
