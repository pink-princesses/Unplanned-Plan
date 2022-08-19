import { useContext, useMemo, useState } from 'react';

import { ContextApi } from '../../App';
import { todoType } from '../../types';
import { updateTodo } from '../../api/requests';
import { todosContext } from '../../contexts/todosContext';
import './Calander.scss';

let targetDate = '';

function CalanderDay({ date, todos, thisMonth }: Props) {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6));

  const MONTH = useMemo(() => new Date().getMonth() + 1, []);
  const DAY = useMemo(() => new Date().getDate(), []);

  const { openTodoState } = useContext(ContextApi);
  const { updateTodos } = useContext(todosContext);
  const dayStatus = ['🤯BUSY', '😵CRIZY', '👿HELL'];

  const end = async (id: number, content: string, done: boolean) => {
    await updateTodo(id, content, done, targetDate);
    await updateTodos();
  };

  const changeTargetDate = (e: any) => {
    const target = e.target;
    if (!target.tagName) return;

    if (target.tagName === 'UL' || target.tagName === 'DIV')
      targetDate = e.target.classList[1];
  };
  return (
    <div
      className={`calander__days ${date}`}
      onDrop={(e) => changeTargetDate(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className={
          thisMonth.toString().padStart(2, '0') === date.slice(4, 6)
            ? ''
            : 'unhighlight'
        }
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
              todos.length > 2
                ? 'calander__addbtn nes-btn is-primary'
                : 'calander__addbtn nes-btn'
            }
            onClick={() => {
              openTodoState({ year, month, day });
            }}
          >
            +
          </span>
        </div>
      </div>
      <ul className={`calander__days__btn ${date}`}>
        {todos.length >= 1
          ? todos
              .filter((t) => t.done !== true)
              .slice(0, 2)
              .map((todo, idx) => (
                <li
                  draggable="true"
                  className={
                    todo.done
                      ? 'todoContent done nes-container is-rounded'
                      : 'todoContent nes-container is-rounded'
                  }
                  key={todo.id}
                  onDragEnd={() => end(todo.id, todo.content, todo.done)}
                >
                  {todo.content}
                </li>
              ))
          : null}
      </ul>
    </div>
  );
}

export default CalanderDay;

interface Props {
  date: string;
  todos: todoType[];
  thisMonth: number;
}
