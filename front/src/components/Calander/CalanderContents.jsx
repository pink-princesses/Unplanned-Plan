import { useContext, useEffect, useState } from 'react';
import CalanderDOW from './CalanderDOW';
import CalanderDay from './CalanderDay';
import './Calander.scss';
import { todosContext } from '../../contexts/todosContext';

function CalanderContents({ currentDate }) {
  const dayOftheWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const [dayList, setDayList] = useState([]);
  const { todos, initiateTodos } = useContext(todosContext);

  useEffect(() => {
    (async () => {
      await initiateTodos(currentDate);
      setDayList(Object.keys(todos));
    })();
  }, []);

  return (
    <>
      <div className="calander__dayOfWeek__wrapper">
        {dayOftheWeek.map((dow, idx) => (
          <CalanderDOW dayOfWeek={dow} key={idx} />
        ))}
      </div>
      <div className="calander__days__wrapper">
        {dayList.map((date) => (
          <CalanderDay key={date} date={date} todos={todos} />
        ))}
      </div>
    </>
  );
}

export default CalanderContents;
