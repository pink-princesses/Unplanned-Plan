import React, { useState, useEffect } from 'react';
import { getAllTodos, createTodo } from '../../api/requests';
import './Todo.scss';

function Todo(props: any) {
  const [todos, setTodos] = useState('');
  const [content, setContnet] = useState('');
  const [checkDone, setCheckDone] = useState(false);

  useEffect(() => {
    try {
      getAllTodos().then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e, '에러');
    }
  }, []);

  const handleContent = (e: any) => {
    setContnet(e.target.value);
  };

  const handleSubmit = () => {
    try {
      createTodo(content, checkDone).then((data) => {
        console.log(data, 'handleSubmit 완료');
      });
    } catch (e) {
      console.log(e, 'handleSubmit 에러');
    }
  };

  const handleCheckbox = () => {
    setCheckDone(!checkDone);
  };

  return (
    <div>
      <input
        placeholder="todo를 입력하세요"
        onChange={(e) => handleContent(e)}
        value={content}
      />
      <input
        type="checkbox"
        className="done__Checkbox"
        onChange={handleCheckbox}
      />
      <label htmlFor="done__Checkbox">완료</label>
      <br />
      <button onClick={handleSubmit}>작성완료</button>
      <h3>4/13 todoHeader</h3>
      <div>{todos}</div>
      <p>todoContent</p>
      <p>todoContent</p>
      <p>todoContent</p>
    </div>
  );
}

export default Todo;
