import React, { useContext, useEffect, useState } from 'react';
import CalanderContents from '../components/calander/CalanderContents';
import CalanderHeader from '../components/calander/CalanderHeader';
import '../components/calander/Calander.scss';
import Todo from '../components/todo/Todo';
import { ContextApi } from '../App';

function Calander() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const { todoState, toggleTodoState } = useContext(ContextApi);

  useEffect(() => {
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
  }, []);

  const changeCalander = (dir: string) => {
    console.log(dir, 'changeCalander');
  };

  return (
    <div className="calander">
      <div className="calander__container">
        <CalanderHeader
          year={year}
          month={month}
          changeCalander={changeCalander}
        />
        <CalanderContents year={year} month={month} currentDate={currentDate} />
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
