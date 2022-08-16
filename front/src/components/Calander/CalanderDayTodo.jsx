import React, { useState } from 'react';
import './Calander.scss';

function CalanderDayTodo({ todo }) {
  const [grab, setGrab] = useState(null);

  const handleDragStart = (e) => {
    console.log('start grab');
    e.target.classList.add('grabbing');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  };

  const handleDragEnd = (e) => {
    console.log('end grab');
    e.target.classList.remove('grabbing');
  };

  return (
    <li
      draggable="true"
      className={todo.done ? 'todoContent done' : 'todoContent'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={() => {
        console.log('놓기');
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {todo.content}
    </li>
  );
}

export default CalanderDayTodo;
