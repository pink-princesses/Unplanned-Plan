import React, { useState, useEffect } from 'react';
import { getAllTodos } from '../../api/requests';
import './Todo.scss';

function Todo(props: any) {
  const [todos, setTodos] = useState('');

  useEffect(() => {
    try {
      getAllTodos().then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e, '에러');
    }
  }, []);

  return (
    <div>
      <input placeholder="todo를 입력하세요" />
      <button>작성완료</button>
      <h3>4/13 todoHeader</h3>
      <div>{todos}</div>
      <p>todoContent</p>
      <p>todoContent</p>
      <p>todoContent</p>
    </div>
  );
}

export default Todo;
