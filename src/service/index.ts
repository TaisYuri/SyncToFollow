import axios from "axios";

export const ApiService = axios.create({
  baseURL: "http://taisyuri.pythonanywhere.com",
  headers: {
    "Content-Type": "application/json",
  },
});

