import { axiosInstance } from './index';

const api = axiosInstance;

// 모든 todo 조회
async function getAllTodos() {
  return await api.get('todos');
}

// todo 작성
async function createTodo(content, done = false) {
  return await api.post('todos/create', { content: content, done: done });
}

export { getAllTodos, createTodo };
