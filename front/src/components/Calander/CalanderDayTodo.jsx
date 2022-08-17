import { useEffect } from 'react';
import './Calander.scss';

function CalanderDayTodo({ todo }) {
  return (
    <li
      data-id={`${todo.id}`}
      data-done={`${todo.done}`}
      data-content={`${todo.content}`}
      draggable="true"
      className={todo.done ? 'todoContent done' : 'todoContent'}
    >
      {todo.content}
    </li>
  );
}

export default CalanderDayTodo;
