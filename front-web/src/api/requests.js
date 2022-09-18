import { axiosInstance } from './index';

const api = axiosInstance;

api.interceptors.request.use(function (config) {
  const jwtToken = localStorage.getItem('jwt');
  const refreshToken = localStorage.getItem('refresh');

  config.headers.jwt = jwtToken;
  config.headers.refresh = refreshToken;
  return config;
});

/**
 *
 * @todo jwt 토큰 만료되었을 때 수신되는 jwt 토큰 데이터 local storage에 저장하는 로직 추가
 * refresh 토큰 만료되었을 때 반환값 추가 -> 로그인 페이지 유도 로직 추가
 */

/**
 * 보여지는 날짜의 투두 조회
 * @param {string} firstDate 왼쪽 최상단 날짜 ex)20201230
 * @param {string} lastDate 오른쪽 최하단 날짜 ex)20201230
 * @returns [ {특정 날짜 투두 데이터}... ]
 */
async function getAllTodos(firstDate, lastDate) {
  return (await api.get(`api/todos/range/${firstDate}/${lastDate}`)).data;
}

/**
 * 특정 날짜의 투두 조회
 * @param {string} date 날짜
 * @returns {특정 날짜 투두 데이터}
 */
async function getTodos(date) {
  return (await api.get(`api/todos?date=${date}`)).data;
}

/**
 * 투두 작성
 * @param {string} content 투두 내용
 * @param {boolean} done 처리 여부
 * @param {string} date 날짜
 * @returns void
 */
async function createTodo(content, done = false, date) {
  return await api.post('api/todos/create', {
    date: date,
    content: content,
    done: done,
  });
}

/**
 * 투두 수정 - 날짜 | 내용 | 수행 여부 변경
 * @param {number} todo_pk 변경하고자 하는 투두의 id값
 * @param {string} content 투두 내용
 * @param {boolean} done 처리 여부
 * @param {string} date 날짜
 * @returns void
 */
async function updateTodo(todo_pk, content, done, date) {
  return await api.put(`api/todos/update/${todo_pk}`, {
    date: date,
    content: content,
    done: done,
  });
}

/**
 * 특정 투두 삭제
 * @param {number} todo_pk 변경하고자 하는 투두의 id값
 * @returns void
 */
async function deleteTodo(todo_pk) {
  return await api.delete(`api/todos/delete/${todo_pk}`);
}

/**
 * 고객센터 건의사항 작성
 * @param {string} content 투두 내용
 * @returns void
 */
async function submitCustomer(content) {
  return await api.post(`api/todos/customer`, { content: content });
}

export {
  getAllTodos,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  submitCustomer,
};
