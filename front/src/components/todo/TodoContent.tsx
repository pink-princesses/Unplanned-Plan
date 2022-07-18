import React, { useEffect, useState } from 'react';
import { updateTodo } from '../../api/requests';

function TodoContent(props: any) {
  const [todoContent, setTodoContent] = useState(props.todo.content);
  const [todoDone, setTodoDone] = useState(props.todo.done);

  const handleDone = () => {
    // TODO : api 통신으로 toggle done
    try {
      updateTodo(props.todo.id, todoContent, !todoDone).then(() => {
        props.refresh();
      });
    } catch (e) {
      console.log(e, 'handleDone ERROR!!!');
    }
  };

  useEffect(() => {
    setTodoContent(props.todo.content);
    setTodoDone(props.todo.done);
  }, []);

  return (
    <>
      <div>{props.todo.id}</div>
      <span className="todos__header">
        {props.todo.created_at.slice(0, 19)}
      </span>
      <div className="todo__container">
        <div
          className={props.todo.done ? 'todo__content done' : 'todo__content'}
          onClick={handleDone}
        >
          {todoContent}
        </div>
        <p>{props.todo.updated_at.slice(0, 19)}</p>
      </div>
    </>
  );
}

export default TodoContent;
