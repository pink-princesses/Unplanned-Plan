import { useContext, useEffect, useState } from 'react';

import CalanderContents from '../components/calander/CalanderContents';
import CalanderHeader from '../components/calander/CalanderHeader';
import Todo from '../components/todo/Todo';

import { todosContext } from '../contexts/todosContext';
import '../components/calander/Calander.scss';
import { drawerContext } from '../contexts/drawerContext';

function Calander() {
  const [showYear, setShowYear] = useState(new Date().getFullYear());
  const [showMonth, setShowMonth] = useState(new Date().getMonth() + 1);
  const { todoState, toggleTodoState } = useContext(drawerContext);
  const { dayList, updateDateList, updateTodos } = useContext(todosContext);

  useEffect(() => {
    updateDateList(showYear, showMonth);
  }, [showYear, showMonth]);

  useEffect(() => {
    try {
      (async () => await updateTodos())();
    } catch (error) {
      alert('TODO LIST를 불러오지 못했습니다');
    }
  }, [dayList]);

  return (
    <div className="calander">
      <div className="calander__container">
        <CalanderHeader
          showYear={showYear}
          showMonth={showMonth}
          setShowYear={setShowYear}
          setShowMonth={setShowMonth}
        />
        <CalanderContents thisMonth={showMonth} />
        <div
          className={todoState ? 'togle_todo_btn' : 'togle_todo_btn hide'}
          onClick={() => {
            toggleTodoState();
          }}
        >
          {todoState ? '투두닫어' : ''}
        </div>
      </div>
      <div className={todoState ? 'calander__todo' : 'calander__todo hide'}>
        <Todo />
      </div>
    </div>
  );
}

export default Calander;
