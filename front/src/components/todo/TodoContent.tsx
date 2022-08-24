import { useContext, useMemo } from 'react';
import { debounce } from 'lodash';

import { updateTodo, deleteTodo } from '../../api/requests';
import { todosContext } from '../../contexts/todosContext';
import { todoType } from '../../types';

function TodoContent({ todo, inputDate }: Props) {
  const todoContent = useMemo(() => todo.content, []);
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
    <div
      className={
        todo.done
          ? 'todos__contents nes-container is-rounded todo_done'
          : 'todos__contents nes-container is-rounded'
      }
    >
      <div className="todos__header">
        <span className="todos__delBtn" onClick={handleDelete}>
          ×
        </span>
      </div>
      <div className="todo__container">
        <div className="todo__content" onClick={handleDone}>
          {todoContent}
        </div>
      </div>
    </div>
  );
}

export default TodoContent;

interface Props {
  todo: todoType;
  inputDate: string;
}
