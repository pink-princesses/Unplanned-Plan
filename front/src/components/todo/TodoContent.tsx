import React, { useContext, useEffect, useState } from 'react';
import { deleteTodo, updateTodo } from '../../api/requests';
import { ContextApi } from '../../App';
import { todosContext } from '../../contexts/todosContext';

function TodoContent(props: any) {
  const { todoDate } = useContext(ContextApi);
  const { todos, updateTodos } = useContext(todosContext);
  const [todoContent, setTodoContent] = useState(props.todo.content);
  const [todoDone, setTodoDone] = useState(props.todo.done);

  const handleDone = () => {
    updateTodo(props.todo.id, todoContent, !todoDone, props.inputDate)
      .then(() => {
        setTodoDone(!todoDone);
      })
      .then(() => {
        updateTodos(
          `${todoDate.year}${todoDate.month
            .toString()
            .padStart(2, '0')}${todoDate.day.toString().padStart(2, '0')}`,
        );
      })
      .catch((e) => {
        console.log(e, 'handleDone ERROR!!!');
      });
  };

  const handleDelete = () => {
    deleteTodo(props.todo.id)
      .then(() => {
        updateTodos(
          `${todoDate.year}${todoDate.month
            .toString()
            .padStart(2, '0')}${todoDate.day.toString().padStart(2, '0')}`,
        );
      })
      .catch((e) => {
        console.log(e, 'handleDelete ERROR!!!');
      });
  };

  return (
    <div className="todos__contents">
      <div className="todos__header">
        <span>
          {`${props.todo.created_at.slice(0, 10)} ${props.todo.created_at.slice(
            11,
            19,
          )}`}
        </span>
        <span className="todos__delBtn" onClick={handleDelete}>
          X
        </span>
      </div>
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
