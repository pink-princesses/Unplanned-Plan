import React, { useState, useEffect, useContext, useMemo } from 'react';
import { getAllTodos, createTodo, getTodos } from '../../api/requests';
import { ContextApi } from '../../App';
import { todosContext } from '../../contexts/todosContext';
import './Todo.scss';
import TodoContent from './TodoContent';

function Todo() {
  const [content, setContnet] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [checkDone, setCheckDone] = useState(false);
  const { todoDate } = useContext(ContextApi);
  const { todos } = useContext(todosContext);

  const year = useMemo(() => String(todoDate.year), [todoDate]);
  const month = useMemo(
    () => String(todoDate.month).padStart(2, '0'),
    [todoDate],
  );
  const day = useMemo(() => String(todoDate.day).padStart(2, '0'), [todoDate]);

  const handleContent = (e: any) => {
    setContnet(e.target.value);
  };

  const handleSubmit = () => {
    createTodo(content, checkDone, inputDate)
      .then((data) => {
        console.log(data, 'handleSubmit 완료');
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
        {todos[`${year}${month}${day}`]
          ? todos[`${year}${month}${day}`].map((todo: any) => (
              <TodoContent todo={todo} key={todo.id} inputDate={inputDate} />
            ))
          : '로딩불가'}
      </div>
    </div>
  );
}

export default Todo;
