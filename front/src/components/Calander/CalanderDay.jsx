import { useContext, useEffect, useState } from 'react';
import { getTodos } from '../../api/requests';
import { ContextApi } from '../../App';
import CalanderDayTodo from './CalanderDayTodo';
import './Calander.scss';

function CalanderDay({ year, month, day }) {
  const [todos, setTodos] = useState([]);
  const TODAY = new Date().getDate();
  const { openTodoState } = useContext(ContextApi);
  const dayStatus = ['🤯BUSY', '😵CRIZY', '👿HELL'];

  useEffect(() => {
    getTodos({ year, month, day }).then((data) => {
      setTodos(data.data);
    });
  }, []);

  return (
    <div className="calander__days">
      <div className="calander__days__top">
        <div>
          <span className={TODAY === day ? 'day__highlight' : null}>{day}</span>
          <span className="day__status">
            {todos.length > 10
              ? dayStatus[2]
              : 10 > todos.length >= 7
              ? dayStatus[1]
              : todos.length > 3
              ? dayStatus[0]
              : ''}
          </span>
        </div>
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
