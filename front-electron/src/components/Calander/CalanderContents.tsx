import { useContext } from 'react';

import CalanderDay from './CalanderDay';

import { todosContext } from '../../contexts/todosContext';
import '../../styles/CalanderContents.scss';

function CalanderContents({ thisMonth }: Props) {
  const dayOftheWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const { todos, dayList } = useContext(todosContext);

  return (
    <>
      <div className="calander__dayOfWeek__wrapper">
        {dayOftheWeek.map((dow) => (
          <div key={dow} className="calander__dayOfWeek__days">
            {dow}
          </div>
        ))}
      </div>
      <div className="calander__days__wrapper">
        {dayList.map(
          (date) =>
            todos[date] && (
              <CalanderDay key={date} date={date} todos={todos[date]} />
            ),
        )}
      </div>
    </>
  );
}

export default CalanderContents;

interface Props {
  thisMonth: number;
}
