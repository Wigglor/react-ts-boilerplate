import axios from "axios";

const BASE_URL = "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosProd = axios.create({
  baseURL: "http://16.170.240.223:3000/",
}); // fetch

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
