import { useContext, useState } from 'react';
import { ContextApi } from '../../App';
import './Calander.scss';

function CalanderDayTodo({ todo }) {
  const { setDragDate } = useContext(ContextApi);
  const [grab, setGrab] = useState(null);

  const handleDragStart = (e) => {
    console.log('start grab');
    setDragDate(todo);
    e.target.classList.add('grabbing');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('grabbing');
  };

  return (
    <li
      draggable="true"
      className={todo.done ? 'todoContent done' : 'todoContent'}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {todo.content}
    </li>
  );
}

export default CalanderDayTodo;
