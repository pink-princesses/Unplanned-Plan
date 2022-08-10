import { useContext, useEffect } from 'react';

import CalanderDOW from './CalanderDOW';
import CalanderDay from './CalanderDay';
import { todosContext } from '../../contexts/todosContext';
import './Calander.scss';

function CalanderContents() {
  const dayOftheWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const { todos, dayList } = useContext(todosContext);

  return (
    <>
      <div className="calander__dayOfWeek__wrapper">
        {dayOftheWeek.map((dow, idx) => (
          <CalanderDOW dayOfWeek={dow} key={idx} />
        ))}
      </div>
      <div className="calander__days__wrapper">
        {dayList.map((date) => (
          <CalanderDay key={date} date={date} todos={todos[date]} />
        ))}
      </div>
    </>
  );
}

export default CalanderContents;
