import { useState, useContext, useMemo } from 'react';

import TodoContent from './TodoContent';

import { createTodo } from '../../api/requests';
import { drawerContext } from '../../contexts/drawerContext';
import { todosContext } from '../../contexts/todosContext';

import './Todo.scss';

function Todo() {
  const [content, setContnet] = useState('');
  const { todoDate } = useContext(drawerContext);
  const { todos, updateTodos, dayList } = useContext(todosContext);

  const year = useMemo(() => String(todoDate.year), [todoDate]);
  const month = useMemo(
    () => String(todoDate.month).padStart(2, '0'),
    [todoDate],
  );
  const day = useMemo(() => String(todoDate.day).padStart(2, '0'), [todoDate]);
  const date = useMemo(() => `${year}${month}${day}`, [todoDate]);

  const handleSubmit = async () => {
    try {
      await createTodo(content, false, date);
      await updateTodos();
    } catch (error) {
      alert('추가하지 못했습니다');
    }
    setContnet('');
  };

  return (
    <div className="todos__container">
      <h1 className="header__date">{`${todoDate.month}월 ${todoDate.day}일에 할일 📚`}</h1>
      <div className="todos__input">
        <input
          placeholder="todo를 입력하세요"
          className="nes-input input__form"
          onChange={(e) => setContnet(e.target.value)}
          value={content}
        />
        <button onClick={handleSubmit} className="submit__btn nes-btn">
          작성완료
        </button>
      </div>
      <div className="todos__todos">
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
