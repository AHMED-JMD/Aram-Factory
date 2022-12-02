import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:40000",
});

export default instance;
