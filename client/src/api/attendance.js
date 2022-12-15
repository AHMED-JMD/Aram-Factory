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
const DeleteAll = async () => {
  try {
    let response = await axiosClient.post("/employees/absence/delete", {});
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

export { absent, nwMonth, findByDate, DeleteAll };
