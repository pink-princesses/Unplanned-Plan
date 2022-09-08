import { useCallback, useContext, useMemo } from 'react';

import { drawerContext } from '../../contexts/drawerContext';
import { todoType } from '../../types';
import { updateTodo } from '../../api/requests';
import { todosContext } from '../../contexts/todosContext';
import '../../styles/CalanderDay.scss';

let targetDate = '';

function CalanderDay({ date, todos, thisMonth }: Props) {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6));

  const MONTH = useMemo(() => new Date().getMonth() + 1, []);
  const DAY = useMemo(() => new Date().getDate(), []);
  const DONE_COUNT = useMemo(
    () => todos.filter((todo) => todo.done === false).length,
    [todos],
  );

  const { openTodoState } = useContext(drawerContext);
  const { updateTodos } = useContext(todosContext);

  const busyChecker = useCallback(() => {
    if (DONE_COUNT > 7) return '🤯BUSY';
    else if (DONE_COUNT > 10) return '😵CRIZY';
    else if (DONE_COUNT > 13) return '👿HELL';
    else return '';
  }, [todos]);

  const dropHandler = async (id: number, content: string, done: boolean) => {
    try {
      await updateTodo(id, content, done, targetDate);
      await updateTodos();
      targetDate = '';
    } catch (error) {
      alert('일정 변경에 실패했습니다');
    }
  };

  const dragHandler = (e: any) => {
    const target = e.target;
    if (!target.tagName) return;
    if (target.tagName === 'UL' || target.tagName === 'DIV')
      targetDate = e.target.classList[1];
  };

  return (
    <div
      className={`calander__days ${date}`}
      onDragEnter={(e) => dragHandler(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className={
          thisMonth.toString().padStart(2, '0') === date.slice(4, 6)
            ? ''
            : 'unhighlight'
        }
      >
        <div className="calander__days__top">
          <div>
            <span
              className={DAY === day && MONTH === month ? 'day__highlight' : ''}
            >
              {day}
            </span>
            <span className="day__status">{busyChecker()}</span>
          </div>
          <span
            className={
              DONE_COUNT > 7
                ? 'sell_btn nes-btn is-primary'
                : 'sell_btn nes-btn'
            }
            onClick={() => {
              openTodoState({ year, month, day });
            }}
          >
            +
          </span>
        </div>
      </div>
      <ul className={`contents ${date}`}>
        {todos.length >= 1
          ? todos
              .filter((t) => t.done !== true)
              .slice(0, 7)
              .map((todo) => (
                <li
                  draggable="true"
                  className={todo.done ? 'content done' : 'content'}
                  key={todo.id}
                  onDragEnd={() =>
                    dropHandler(todo.id, todo.content, todo.done)
                  }
                >
                  <span className="dot"></span>
                  <span className="string">{todo.content}</span>
                </li>
              ))
          : null}
      </ul>
    </div>
  );
}

export default CalanderDay;

interface Props {
  date: string;
  todos: todoType[];
  thisMonth: number;
}
