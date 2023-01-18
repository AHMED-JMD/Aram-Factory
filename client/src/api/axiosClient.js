import axios from "axios";
const instance = axios.create({
  baseURL: "https://erm-factory.com/",
});

export default instance;
