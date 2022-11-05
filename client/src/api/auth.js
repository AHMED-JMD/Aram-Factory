import axiosClient from "./axiosClient";

const login = async (username, password) => {
  try {
    let response = await axiosClient.post("/user/login", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
};

const authenticate = async () => {
  try {
    let response = await axiosClient.get("/user/get-user", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    if (error) throw error;
  }
};

export { login, authenticate };
