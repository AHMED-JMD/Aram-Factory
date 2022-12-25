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
const multiAbsent = async (ids, dates) => {
  try {
    let response = await axiosClient.post("/employees/multi-absence", {
      ids,
      dates,
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
const findByDate = async (date) => {
  try {
    let response = await axiosClient.post("/employees/absence/findOne", {
      date,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const DeletOne = async (date, emp_id) => {
  try {
    let response = await axiosClient.post("/employees/absence/deleteOne", {
      date,
      emp_id,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const DeleteAll = async (date) => {
  try {
    let response = await axiosClient.post("/employees/absence/delete", {
      date,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

export { absent, multiAbsent, nwMonth, findByDate, DeletOne, DeleteAll };
