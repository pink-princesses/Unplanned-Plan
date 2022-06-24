import React, { useEffect, useState } from 'react';

function TodoContent(props: any) {
  return (
    <div className="todo__container">
      <div className={props.todo.done ? 'done' : ''}>{props.todo.content}</div>
      <p>{props.todo.updated_at}</p>
    </div>
  );
}

export default TodoContent;
