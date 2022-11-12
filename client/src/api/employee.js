import axiosClient from "./axiosClient";

const addEmployee = async (data) => {
  try {
    let response = await axiosClient.post("/employees/add", data);
    return response;
  } catch (error) {
    throw error;
  }
};
const viewAll = async () => {
  try {
    let response = await axiosClient.get("/employees/view");
    return response;
  } catch (error) {
    throw error;
  }
};
const viewOne = async (emp_id) => {
  try {
    let response = await axiosClient.post("/employees/viewOne", { emp_id });
    return response;
  } catch (error) {
    throw error;
  }
};
const updateEmployee = async (data) => {
  try {
    let response = await axiosClient.post("/employees/update", data);
    return response;
  } catch (error) {
    throw error;
  }
};
const updateGrant = async (data) => {
  try {
    let response = await axiosClient.post("/employees/update_grants", data);
    return response;
  } catch (error) {
    throw error;
  }
};
const updateImage = async (data) => {
  try {
    let response = await axiosClient.post("/employees/update_image", data);
    return response;
  } catch (error) {
    throw error;
  }
};
const deleteEmployee = async (emp_id) => {
  try {
    let response = await axiosClient.post("/employees/delete", { emp_id });
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  addEmployee,
  viewAll,
  viewOne,
  updateEmployee,
  updateGrant,
  updateImage,
  deleteEmployee,
};
