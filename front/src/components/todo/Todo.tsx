import { useState, useContext, useMemo } from 'react';

import { createTodo } from '../../api/requests';
import { ContextApi } from '../../App';
import { todosContext } from '../../contexts/todosContext';
import TodoContent from './TodoContent';

import './Todo.scss';

function Todo() {
  const [content, setContnet] = useState('');
  const { todoDate } = useContext(ContextApi);
  const { todos, updateTodos, dayList } = useContext(todosContext);

  const year = useMemo(() => String(todoDate.year), [todoDate]);
  const month = useMemo(
    () => String(todoDate.month).padStart(2, '0'),
    [todoDate],
  );
  const day = useMemo(() => String(todoDate.day).padStart(2, '0'), [todoDate]);
  const date = useMemo(() => `${year}${month}${day}`, [todoDate]);

  const handleSubmit = async () => {
    await createTodo(content, false, date);
    await updateTodos();
    setContnet('');
  };

  return (
    <div className="todos__container">
      <div className="todos__input">
        <input
          placeholder="todo를 입력하세요"
          onChange={(e) => setContnet(e.target.value)}
          value={content}
        />
        <button onClick={handleSubmit} className="submit__btn">
          작성완료
        </button>
      </div>
      <div className="todos__todos">
        <h1 className="header__date">{`${todoDate.month}/${todoDate.day}`}</h1>
        {todos[date]
          ? todos[date].map((todo) => (
              <TodoContent todo={todo} key={todo.id} inputDate={date} />
            ))
          : '로딩불가'}
      </div>
    </div>
  );
}

export default Todo;
