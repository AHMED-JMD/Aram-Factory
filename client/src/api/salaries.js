import axiosClient from "./axiosClient";

const add = async (date, total) => {
  try {
    let response = await axiosClient.post("/salaries/", {
      date,
      total,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const viewCheckout = async (id) => {
  try {
    let response = await axiosClient.post("/salaries/get-one", {
      id,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const deleteCheck = async (id) => {
  try {
    let response = await axiosClient.post("/salaries/delete", {
      id,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

const view = async () => {
  try {
    let response = await axiosClient.get("/salaries/");
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

const viewSchedule = async () => {
  try {
    let response = await axiosClient.get("/salaries/get-all");
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

export { add, viewSchedule, viewCheckout, view, deleteCheck };
