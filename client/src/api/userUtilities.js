import axiosClient from "./axiosClient";

const forgetPassword = async (email) => {
  try {
    let response = await axiosClient.post("/user/utilities/forget-password", {
      email,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

const verifyLink = async (token, id) => {
  try {
    let response = await axiosClient.post("/user/utilities/verify-link", {
      id,
      token,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

const resetPassword = async (newPassword, id) => {
  try {
    let response = await axiosClient.post("/user/utilities/reset-password", {
      newPassword,
      id,
    });
    return response;
  } catch (error) {
    if (error) throw error;
  }
};

export { forgetPassword, verifyLink, resetPassword };
