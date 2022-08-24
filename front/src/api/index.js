import axios from 'axios';

const BASE_URL = 'http://52.79.234.120:8000/';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
