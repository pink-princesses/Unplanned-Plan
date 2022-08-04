import React, { useEffect, useState } from 'react';
import { updateTodo } from '../../api/requests';

function TodoContent(props: any) {
  const [todoContent, setTodoContent] = useState(props.todo.content);
  const [todoDone, setTodoDone] = useState(props.todo.done);

  const handleDone = () => {
    try {
      updateTodo(props.todo.id, todoContent, !todoDone)
        .then(() => {
          setTodoDone(!todoDone);
        })
        .then(() => {
          props.refresh();
        });
    } catch (e) {
      console.log(e, 'handleDone ERROR!!!');
    }
  };

  return (
    <div className="todos__contents">
      <span className="todos__header">
        {`${props.todo.created_at.slice(0, 10)} ${props.todo.created_at.slice(
          11,
          19,
        )}`}
      </span>
      <div className="todo__container">
        <div
          className={props.todo.done ? 'todo__content done' : 'todo__content'}
          onClick={handleDone}
        >
          {todoContent}
        </div>
        <p>{props.todo.date}</p>
        <p>{`${props.todo.updated_at.slice(
          0,
          10,
        )} ${props.todo.updated_at.slice(11, 19)}`}</p>
      </div>
    </div>
  );
}

export default TodoContent;
