import { useContext } from 'react';
import { ContextApi } from '../../App';
import CalanderDayTodo from './CalanderDayTodo';
import './Calander.scss';

function CalanderDay({ date, todos }) {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6));

  const TODAY = new Date().getDate();
  const { openTodoState } = useContext(ContextApi);
  const dayStatus = ['🤯BUSY', '😵CRIZY', '👿HELL'];

  return (
    <div className="calander__days">
      <div className="calander__days__top">
        <div>
          <span className={TODAY === day ? 'day__highlight' : null}>{day}</span>
          <span className="day__status">
            {todos.length >= 10
              ? dayStatus[2]
              : 10 > todos.length > 6
              ? dayStatus[1]
              : 6 > todos.length > 3
              ? dayStatus[0]
              : ''}
          </span>
        </div>
        <span
          className={
            todos.length > 3 ? 'calander__addbtn many' : 'calander__addbtn'
          }
          onClick={() => {
            openTodoState({ year, month, day });
          }}
        >
          +
        </span>
      </div>
      <div className="calander__days__btn">
        {todos.length >= 1
          ? todos
              .slice(0, 3)
              .map((todo, idx) => <CalanderDayTodo todo={todo} key={idx} />)
          : null}
      </div>
    </div>
  );
}

export default CalanderDay;
