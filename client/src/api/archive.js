import axiosClient from "./axiosClient";

const add = async (data) => {
  try {
    let response = await axiosClient.post("/employees/archive/", data);
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
};

const view = async () => {
  try {
    let response = await axiosClient.get("/employees/archive");
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
};

export { add, view };
