import { axiosInstance } from './index';

const api = axiosInstance;

// 보여지는 달력 todo 조회
async function getAllTodos(firstDate, lastDate) {
  return (await api.get(`api/todos/range/${firstDate}/${lastDate}`)).data;
}

// 특정날짜 todo 조회
async function getTodos(date) {
  return (await api.get(`api/todos?date=${date}`)).data;
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
  console.log(date);
  return await api.put(`api/todos/update/${todo_pk}`, {
    date: date,
    content: content,
    done: done,
  });
}

// todo 날짜만수정

// todo 삭제
async function deleteTodo(todo_pk) {
  return await api.delete(`api/todos/delete/${todo_pk}`);
}

export { getAllTodos, getTodos, createTodo, updateTodo, deleteTodo };
