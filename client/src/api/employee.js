import axiosClient from "./axiosClient";

const addEmployee = async (data) => {
  try {
    let response = await axiosClient.post("/employees/add", data);
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};

export { addEmployee };
