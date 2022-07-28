import React, { useState, useEffect } from 'react';
import { getAllTodos, createTodo } from '../../api/requests';
import './Todo.scss';
import TodoContent from './TodoContent';

function Todo(props: any) {
  const [todos, setTodos] = useState([]);
  const [content, setContnet] = useState('');
  const [checkDone, setCheckDone] = useState(false);

  useEffect(() => {
    try {
      getAllTodos().then((data) => {
        console.log(data.data, '투두');
        setTodos(data.data);
      });
    } catch (e) {
      console.log(e, '에러');
    }
  }, []);

  const handleRefresh = () => {
    getAllTodos().then((data) => {
      setTodos(data.data);
    });
  };

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
    <div className="todos__container">
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
      <button onClick={handleSubmit} className="submit__btn">
        작성완료
      </button>
      <div>
        {todos
          ? todos.map((todo: any) => (
              <TodoContent todo={todo} key={todo.id} refresh={handleRefresh} />
            ))
          : '로딩불가'}
      </div>
    </div>
  );
}

export default Todo;
