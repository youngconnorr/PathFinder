import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/"; //NEED TO CHANGE THIS ON DEPLOYMENT? its the django server

const AxiosInstance = axios.create({
  //baseUrl is ALWAYS THE SAME
  baseURL: baseUrl,

  //time between button press and post
  timeout: 1000,
  headers: {
    "Content-Type": "application/json", //what is being sent from frontend
    accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  //authorizes the token being created
  (config) => {
    const token = localStorage.getItem("Token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      config.headers.Authorization = ``;
    }
    return config;
  }
);

AxiosInstance.interceptors.response.use(
  //catches invalid token error!
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("Token");
      window.location.href = "/login";
    }
  }
);

export default AxiosInstance;
