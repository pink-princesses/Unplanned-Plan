import { axiosInstance } from './index';

const api = axiosInstance;

// 모든 todo 조회
async function getAllTodos() {
  return await api.get('api/todos');
}

// todo 작성
async function createTodo(content, done = false) {
  return await api.post('api/todos/create', { content: content, done: done });
}

// todo 내용수정
async function updateTodo(todo_pk, content, done) {
  return await api.put(`api/todos/update/${todo_pk}`, {
    content: content,
    done: done,
  });
}

export { getAllTodos, createTodo, updateTodo };
