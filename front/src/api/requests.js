import { axiosInstance } from './index';

const api = axiosInstance;

// 모든 todo 조회
async function getAllTodos() {
  return await api.get('todos');
}

export { getAllTodos };
