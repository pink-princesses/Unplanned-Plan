import { useContext, useEffect, useState } from 'react';
import { getTodos } from '../../api/requests';
import { ContextApi } from '../../App';
import CalanderDayTodo from './CalanderDayTodo';
import './Calander.scss';

function CalanderDay({ year, month, day }) {
  const [todos, setTodos] = useState([]);
  const TODAY = new Date().getDate();
  const { openTodoState } = useContext(ContextApi);

  useEffect(() => {
    getTodos({ year, month, day }).then((data) => {
      setTodos(data.data);
    });
  }, []);

  return (
    <div className="calander__days">
      <div className="calander__days__top">
        <span className={TODAY === day ? 'day__highlight' : null}>{day}</span>
        <span
          className="calander__addbtn"
          onClick={() => {
            openTodoState({ year, month, day });
          }}
        >
          +
        </span>
      </div>
      <div className="calander__days__btn">
        {todos.length >= 1
          ? todos.map((todo, idx) => <CalanderDayTodo todo={todo} key={idx} />)
          : null}
      </div>
    </div>
  );
}

export default CalanderDay;
