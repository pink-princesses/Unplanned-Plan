import { useContext, useState } from 'react';
import { updateTodo, deleteTodo } from '../../api/requests';
import { todosContext } from '../../contexts/todosContext';
import { todoType } from '../../types';

function TodoContent({ todo, inputDate }: Props) {
  const [todoContent, setTodoContent] = useState(todo.content);
  const { updateTodos } = useContext(todosContext);

  const handleDone = async () => {
    await updateTodo(todo.id, todoContent, !todo.done, inputDate);
    await updateTodos();
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    await updateTodos();
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
