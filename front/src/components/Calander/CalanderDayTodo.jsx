import React from 'react';
import './Calander.scss';

function CalanderDayTodo({ todo }) {
  return <div>{todo.content}</div>;
}

export default CalanderDayTodo;
