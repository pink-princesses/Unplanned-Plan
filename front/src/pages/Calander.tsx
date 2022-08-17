import { useContext, useEffect, useState } from 'react';
import CalanderContents from '../components/calander/CalanderContents';
import CalanderHeader from '../components/calander/CalanderHeader';
import '../components/calander/Calander.scss';
import Todo from '../components/todo/Todo';
import { todosContext } from '../contexts/todosContext';
import { drawerContext } from '../contexts/drawerContext';

function Calander() {
  const [showYear, setShowYear] = useState(new Date().getFullYear());
  const [showMonth, setShowMonth] = useState(new Date().getMonth() + 1);
  const { todoState, toggleTodoState, closeTodoState } =
    useContext(drawerContext);
  const { dayList, updateDateList, updateTodos } = useContext(todosContext);

  const changeCalander = (dir: string) => {
    switch (dir) {
      case 'prev':
        if (showMonth <= 1) {
          setShowYear((pre) => pre - 1);
          setShowMonth(12);
        } else {
          setShowMonth((pre) => pre - 1);
        }
        closeTodoState();
        break;
      case 'next':
        if (showMonth >= 12) {
          setShowYear((pre) => pre + 1);
          setShowMonth(1);
        } else {
          setShowMonth((pre) => pre + 1);
        }
        closeTodoState();
        break;
    }
  };

  useEffect(() => {
    updateDateList(showYear, showMonth);
  }, [showYear, showMonth]);

  useEffect(() => {
    (async () => {
      await updateTodos();
    })();
  }, [dayList]);

  return (
    <div className="calander">
      <div className="calander__container">
        <CalanderHeader
          year={showYear}
          month={showMonth}
          changeCalander={changeCalander}
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
