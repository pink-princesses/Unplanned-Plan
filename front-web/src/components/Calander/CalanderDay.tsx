import { useCallback, useContext, useMemo, useState } from 'react';

import { todoType } from '../../types';
import { createTodo, deleteTodo, updateTodo } from '../../api/requests';
import { todosContext } from '../../contexts/todosContext';
import '../../styles/CalanderDay.scss';
import { debounce } from 'lodash';

let targetDate = '';

function CalanderDay({ date, todos }: Props) {
  const HEGHTLIGHT = useMemo(() => {
    return (
      new Date().getMonth() + 1 === Number(date.slice(4, 6)) &&
      new Date().getDate() === Number(date.slice(6))
    );
  }, []);
  const DONE_COUNT = useMemo(
    () => todos.filter((todo) => todo.done === false).length,
    [todos],
  );

  const [stretch, setStretch] = useState(false);
  const [moving, setMoving] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { updateTodos } = useContext(todosContext);

  const busyChecker = useCallback(() => {
    if (DONE_COUNT > 13) return '👿HELL';
    else if (DONE_COUNT > 10) return '😵CRIZY';
    else if (DONE_COUNT > 7) return '🤯BUSY';
    else return '';
  }, [todos]);

  const makefilteredTodoList = useCallback(
    (isNeed: boolean) => {
      if (isNeed) return todos.filter((t) => t.done !== true).slice(0, 7);
      else return todos;
    },
    [todos],
  );

  const toggleStretch = (state: boolean) => setStretch(state);

  const dropHandler = async (id: number, content: string, done: boolean) => {
    try {
      await updateTodo(id, content, done, targetDate);
      await updateTodos();
      targetDate = '';
    } catch (error) {
      alert('일정 변경에 실패했습니다');
    } finally {
      setMoving(false);
    }
  };

  const changeHandler = (newValue: string) => setInputValue(newValue);

  const addBtnClickHandler = async () => {
    if (!inputValue) {
      alert('올바른 todo를 입력해주세요');
      return;
    }

    try {
      await createTodo(inputValue, false, date);
      await updateTodos();
    } catch (error) {
      alert('추가하지 못했습니다');
    }
    setInputValue('');
  };

  const todoClickHandler = debounce(
    async (id: number, content: string, done: boolean, inputDate: string) => {
      if (!stretch) return;

      try {
        await updateTodo(id, content, done, inputDate);
        await updateTodos();
      } catch (error) {
        alert('완료 처리를 하지 못했습니다');
      }
    },
    500,
  );

  const deleteBtnClickhandler = async (id: number) => {
    const res = confirm('todo를 삭제합니다');
    if (res) {
      try {
        await deleteTodo(id);
        await updateTodos();
      } catch (error) {
        alert('삭제하지 못했습니다');
      }
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
      <div className={`flexable_box ${stretch ? 'stretch' : ''}`}>
        <div className="calander__days__top">
          <span>
            <span className={HEGHTLIGHT ? 'highlight' : ''}>
              {Number(date.slice(6))}
            </span>
            <span className="day__status">{busyChecker()}</span>
          </span>
          <span
            className={`nes-btn sell_btn ${DONE_COUNT > 7 ? 'is-primary' : ''}`}
            onClick={() => toggleStretch(!stretch)}
          >
            {stretch ? '-' : '+'}
          </span>
        </div>
        <ul className={`contents ${date}`}>
          {stretch && (
            <div className="add__todo">
              <input
                value={inputValue}
                onChange={(e) => changeHandler(e.target.value)}
                type="text"
              />
              <button onClick={addBtnClickHandler}>추가</button>
            </div>
          )}
          {todos.length >= 1
            ? makefilteredTodoList(!stretch).map((todo) => (
                <>
                  <li className="item" key={todo.id}>
                    <span
                      className="content"
                      draggable="true"
                      onDragEnd={() =>
                        dropHandler(todo.id, todo.content, todo.done)
                      }
                      onMouseUp={() =>
                        todoClickHandler(
                          todo.id,
                          todo.content,
                          !todo.done,
                          todo.date,
                        )
                      }
                    >
                      <span className="dot"></span>
                      <span
                        className={`string ${todo.done ? ' done' : ''} ${
                          !stretch ? 'no__stretch' : ''
                        }`}
                      >
                        {todo.content}
                      </span>
                    </span>
                    {stretch && (
                      <button
                        className="delete__btn"
                        onClick={() => deleteBtnClickhandler(todo.id)}
                      >
                        x
                      </button>
                    )}
                  </li>
                </>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default CalanderDay;

interface Props {
  date: string;
  todos: todoType[];
}
