import { axiosInstance } from './index';

const api = axiosInstance;

// 모든 todo 조회 - 동작 안함
async function getAllTodos() {
  return await api.get('api/todos');
}

// 특정날짜 todo 조회
async function getTodos(date) {
  return await api.get(`api/todos?date=${date}`);
}

// todo 작성
async function createTodo(content, done = false, date) {
  console.log(date);
  return await api.post('api/todos/create', {
    date: date,
    content: content,
    done: done,
  });
}

// todo 내용수정
async function updateTodo(todo_pk, content, done, date) {
  return await api.put(`api/todos/update/${todo_pk}`, {
    date: date,
    content: content,
    done: done,
  });
}

// todo 날짜만수정

export { getAllTodos, getTodos, createTodo, updateTodo };
