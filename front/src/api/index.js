import axios from 'axios';

const BASE_URL = 'http://52.79.234.120:8000/';

const createAxiosInstance = () => {
  const jwtToken = localStorage.getItem('jwt');
  const refreshToken = localStorage.getItem('refresh');
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'jwt': jwtToken,
      'refresh': refreshToken,
    },
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
