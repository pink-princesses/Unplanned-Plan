import { useContext, useState } from 'react';
import { debounce } from 'lodash';

import { updateTodo, deleteTodo } from '../../api/requests';
import { todosContext } from '../../contexts/todosContext';
import { todoType } from '../../types';

function TodoContent({ todo, inputDate }: Props) {
  const [todoContent, setTodoContent] = useState(todo.content);
  const { updateTodos } = useContext(todosContext);

  const handleDone = debounce(async () => {
    try {
      await updateTodo(todo.id, todoContent, !todo.done, inputDate);
      await updateTodos();
    } catch (error) {
      alert('완료 처리를 하지 못했습니다');
    }
  }, 500);

  const handleDelete = async () => {
    const res = confirm('todo를 삭제합니다');
    if (res) {
      try {
        await deleteTodo(todo.id);
        await updateTodos();
      } catch (error) {
        alert('삭제하지 못했습니다');
      }
    }
  };

  return (
    <div className="todos__contents">
      <div className="todos__header">
        <span>
          {`${todo.created_at.slice(0, 10)} ${todo.created_at.slice(11, 19)}`}
        </span>
        <span className="todos__delBtn" onClick={handleDelete}>
          X
        </span>
      </div>
      <div className="todo__container">
        <div
          className={todo.done ? 'todo__content done' : 'todo__content'}
          onClick={handleDone}
        >
          {todoContent}
        </div>
        <p>{todo.date}</p>
        <p>{`${todo.updated_at.slice(0, 10)} ${todo.updated_at.slice(
          11,
          19,
        )}`}</p>
      </div>
    </div>
  );
}

export default TodoContent;

interface Props {
  todo: todoType;
  inputDate: string;
}
