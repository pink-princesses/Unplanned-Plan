import React, { useEffect, useState } from 'react';
import CalanderContents from '../components/Calander/CalanderContents';
import CalanderHeader from '../components/Calander/CalanderHeader';
import '../components/Calander/Calander.scss';
import Todo from '../components/todo/Todo';

function Calander() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
  }, []);

  return (
    <div className="calander">
      <div className="calander__container">
        <CalanderHeader year={year} month={month} />
        <CalanderContents currentDate={currentDate} />
        <div
          className="togle_todo_btn"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? '투두닫어' : '투두열어'}
        </div>
      </div>
      <div className={isActive ? '' : 'hide'}>
        <Todo />
      </div>
    </div>
  );
}

export default Calander;
