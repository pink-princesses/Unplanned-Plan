import React, { useEffect, useState } from 'react';
import CalanderContents from '../components/calander/CalanderContents';
import CalanderHeader from '../components/calander/CalanderHeader';
import '../components/calander/Calander.scss';
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
