import axios from "axios";
const ApiManager = axios.create({
  baseURL: 'https://1c25-49-205-239-58.in.ngrok.io/api',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
 