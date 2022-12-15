import axiosClient from "./axiosClient";

const borrow = async (emp_id, amount, date) => {
  try {
    let response = await axiosClient.post("/employees/borrow", {
      emp_id,
      amount,
      date,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const getDeduct = async () => {
  try {
    let response = await axiosClient.get("/employees/borrow");
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const deleteAll = async (ids) => {
  try {
    let response = await axiosClient.post("/employees/borrow/deleteAll", {
      ids,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const returnAmount = async (id, nwAmount) => {
  try {
    let response = await axiosClient.post("/employees/borrow/return", {
      id,
      nwAmount,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

export { borrow, getDeduct, deleteAll, returnAmount };
