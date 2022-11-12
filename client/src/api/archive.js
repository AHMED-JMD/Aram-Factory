import axiosClient from "./axiosClient";

const add = async (emp_ids) => {
  try {
    let response = await axiosClient.post("/employees/archive/", { emp_ids });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};
const returnArchive = async (emp_ids) => {
  try {
    let response = await axiosClient.post("/employees/archive/return", {
      emp_ids,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

const view = async () => {
  try {
    let response = await axiosClient.get("/employees/archive");
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

export { add, view, returnArchive };
