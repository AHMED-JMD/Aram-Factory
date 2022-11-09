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

const borrow = async (emp_name, amount) => {
  try {
    let response = await axiosClient.post("/employees/borrow", {
      emp_name,
      amount,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

export { absent, nwMonth, borrow };
