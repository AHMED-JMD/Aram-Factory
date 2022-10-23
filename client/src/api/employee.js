import axiosClient from "./axiosClient";

const addEmployee = async (data) => {
  try {
    let response = await axiosClient.post("/employees/add", data);
    return response;
  } catch (error) {
    throw error;
  }
};
const viewAll = async (page) => {
  try {
    console.log(page);
    let response = await axiosClient.get("/employees/view", {
      headers: {
        page: page,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const viewOne = async (emp_id) => {
  try {
    let response = await axiosClient.post("/employees/viewOne", emp_id);
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
const deleteEmployee = async (emp_ids) => {
  try {
    let response = await axiosClient.post("/employees/delete", emp_ids);
    return response;
  } catch (error) {
    throw error;
  }
};

export { addEmployee, viewAll, viewOne, updateEmployee, deleteEmployee };
