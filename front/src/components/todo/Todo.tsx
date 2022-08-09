import React, { useState, useEffect, useContext } from 'react';
import { getAllTodos, createTodo, getTodos } from '../../api/requests';
import { ContextApi } from '../../App';
import './Todo.scss';
import TodoContent from './TodoContent';

function Todo(props: any) {
  const [todos, setTodos] = useState([]);
  const [content, setContnet] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [checkDone, setCheckDone] = useState(false);
  const { todoDate } = useContext(ContextApi);

  const getTodosReq = () => {
    getTodos(todoDate).then((data) => {
      console.log(data, '리퀘응답');
      setTodos(data.data);
    });
  };
  useEffect(() => {
    getTodosReq();
    handleDate(todoDate);
  }, [todoDate]);

  const handleRefresh = () => {
    getTodosReq();
  };

  const handleDate = (data: any) => {
    setInputDate(
      `${data.year}${data.month.toString().padStart(2, '0')}${data.day
        .toString()
        .padStart(2, '0')}`,
    );
  };

  const handleContent = (e: any) => {
    setContnet(e.target.value);
  };

  const handleSubmit = () => {
    createTodo(content, checkDone, inputDate)
      .then((data) => {
        console.log(data, 'handleSubmit 완료');
      })
      .then(() => {
        handleRefresh();
      })
      .catch((e) => {
        console.log(e, 'handleSubmit 에러');
      });
  };

  const handleCheckbox = () => {
    setCheckDone(!checkDone);
  };

  return (
    <div className="todos__container">
      <div className="todos__input">
        <input
          placeholder="todo를 입력하세요"
          onChange={(e) => handleContent(e)}
          value={content}
        />
        <button onClick={handleSubmit} className="submit__btn">
          작성완료
        </button>
      </div>
      <div className="todos__todos">
        <h1 className="header__date">{`${todoDate.month}/${todoDate.day}`}</h1>
        {todos
          ? todos.map((todo: any) => (
              <TodoContent
                todo={todo}
                key={todo.id}
                refresh={handleRefresh}
                inputDate={inputDate}
              />
            ))
          : '로딩불가'}
      </div>
    </div>
  );
}

export default Todo;
