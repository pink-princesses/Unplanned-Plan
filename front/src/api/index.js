import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-type': 'application/json',
      // 'Access-Control-Allow-Credentials': true,
    },
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
