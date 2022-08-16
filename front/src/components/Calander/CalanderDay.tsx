import { useContext, useMemo } from 'react';

import CalanderDayTodo from './CalanderDayTodo';

import { ContextApi } from '../../App';
import { todoType } from '../../types';
import './Calander.scss';

function CalanderDay({ date, todos }: Props) {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6));

  const MONTH = useMemo(() => new Date().getMonth() + 1, []);
  const DAY = useMemo(() => new Date().getDate(), []);

  const { openTodoState } = useContext(ContextApi);
  const dayStatus = ['🤯BUSY', '😵CRIZY', '👿HELL'];

  return (
    <div
      className="calander__days"
      onDragOver={() => {
        console.log(date);
      }}
    >
      <div className="calander__days__top">
        <div>
          <span
            className={DAY === day && MONTH === month ? 'day__highlight' : ''}
          >
            {day}
          </span>
          <span className="day__status">
            {todos.length >= 10
              ? dayStatus[2]
              : 10 > todos.length && todos.length >= 6
              ? dayStatus[1]
              : 6 > todos.length && todos.length > 3
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
      <ul className="calander__days__btn">
        {todos.length >= 1
          ? todos
              .slice(0, 3)
              .map((todo, idx) => <CalanderDayTodo todo={todo} key={idx} />)
          : null}
      </ul>
    </div>
  );
}

export default CalanderDay;

interface Props {
  date: string;
  todos: todoType[];
}
