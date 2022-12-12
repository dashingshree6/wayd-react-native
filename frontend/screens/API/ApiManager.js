import axios from 'axios';
const ApiManager = axios.create({
  baseURL: 'https://f5b6-49-205      -239-58.in.ngrok.io/api   ',
  responseTypes: 'json',
  withCredentials: true,
});

export default ApiManager;
 