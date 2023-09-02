import axios from "axios";

export const ApiService = axios.create({
  baseURL: "http://taisyuri.pythonanywhere.com",
  // baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

//http://taisyuri.pythonanywhere.com/api/
