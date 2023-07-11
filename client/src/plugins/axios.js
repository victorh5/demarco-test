import axios from 'axios';

const api = axios.create({
  baseURL: 'https://demarco-test-8398698c1bf5.herokuapp.com/api',
});

export default api;
