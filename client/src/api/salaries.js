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

const view = async () => {
  try {
    let response = await axiosClient.get("/salaries/");
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
};

const viewSchedule = async () => {
  try {
    let response = await axiosClient.get("/salaries/get-all");
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
};

export { add, viewSchedule, view };
