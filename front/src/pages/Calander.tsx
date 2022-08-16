import { useContext, useEffect, useState } from 'react';
import CalanderContents from '../components/calander/CalanderContents';
import CalanderHeader from '../components/calander/CalanderHeader';
import '../components/calander/Calander.scss';
import Todo from '../components/todo/Todo';
import { ContextApi } from '../App';
import { todosContext } from '../contexts/todosContext';

function Calander() {
  const [showYear, setShowYear] = useState(new Date().getFullYear());
  const [showMonth, setShowMonth] = useState(new Date().getMonth() + 1);
  const { todoDate, todoState, toggleTodoState } = useContext(ContextApi);
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
        break;
      case 'next':
        if (showMonth >= 12) {
          setShowYear((pre) => pre + 1);
          setShowMonth(1);
        } else {
          setShowMonth((pre) => pre + 1);
        }
        break;
    }
  };

  useEffect(() => {
    updateDateList(showYear, showMonth);
  }, [showYear, showMonth]);

  useEffect(() => {
    (async () => {
      await updateTodos(dayList[0], dayList[dayList.length - 1]);
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
        <CalanderContents />
        <div
          className={todoState ? 'togle_todo_btn' : 'togle_todo_btn hide'}
          onClick={() => {
            toggleTodoState();
          }}
        >
          {todoState ? '투두닫어' : ''}
        </div>
      </div>
      <div className={todoState ? '' : 'hide'}>
        <Todo />
      </div>
    </div>
  );
}

export default Calander;
