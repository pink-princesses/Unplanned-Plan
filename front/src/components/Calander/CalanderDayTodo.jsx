import React from 'react';
import './Calander.scss';

function CalanderDayTodo({ todo }) {
  return (
    <div className={todo.done ? 'todoContent done' : 'todoContent'}>
      {todo.content}
    </div>
  );
}

export default CalanderDayTodo;
