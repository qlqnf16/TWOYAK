import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.twoyak.com"
  // baseURL: 'https://mohhamad.com'
  // baseURL: "http://52.79.228.195"
  // baseURL: "http://localhost:3000",
});

export default instance;
