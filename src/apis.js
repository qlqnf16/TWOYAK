import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.twoyak.com"
  // baseURL: "http://52.79.228.195"
});

export default instance;
