import axios from "axios";

let api_url = process.env.API_URL || "http://localhost:8000/"

const instance = axios.create({
  baseURL: api_url
});

export default instance;