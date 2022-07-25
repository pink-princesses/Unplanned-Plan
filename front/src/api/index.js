import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

const createAxiosInstance = () => {
  const jwtToken = localStorage.getItem('jwt');
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-type': 'application/json',
      // 'Access-Control-Allow-Credentials': true,
      'Authorization': jwtToken,
    },
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
