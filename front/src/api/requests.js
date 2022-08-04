import { axiosInstance } from './index';

const api = axiosInstance;

// 모든 todo 조회
async function getAllTodos() {
  return await api.get('api/todos');
}

// 특정날짜 todo 조회
async function getTodos({ year, month, day }) {
  const date =
    year.toString() +
    month.toString().padStart(2, '0') +
    day.toString().padStart(2, '0');
  return await api.get(`api/todos?date=${date}`);
}

// todo 작성
async function createTodo(content, done = false, date = '20220815') {
  return await api.post('api/todos/create', {
    date: date,
    content: content,
    done: done,
  });
}

// todo 내용수정
async function updateTodo(todo_pk, content, done, date = '20220815') {
  return await api.put(`api/todos/update/${todo_pk}`, {
    date: date,
    content: content,
    done: done,
  });
}

export { getAllTodos, getTodos, createTodo, updateTodo };
