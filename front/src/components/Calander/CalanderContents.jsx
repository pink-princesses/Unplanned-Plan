import React, { useEffect, useState } from 'react';
import CalanderDOW from './CalanderDOW';
import CalanderDay from './CalanderDay';
import './Calander.scss';

function CalanderContents({ currentDate }) {
  const dayOftheWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const [calanderDays, setCalanderDays] = useState([]);

  const makeDays = () => {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;

    let prevLastDate = new Date(year, month - 1, 0).getDate();
    let prevLastDay = new Date(year, month - 1, 0).getDay();

    let nextLastDate = new Date(year, month, 0).getDate();
    let nextLastDay = new Date(year, month, 0).getDay();

    let prevDays = [];
    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i++) {
        prevDays.unshift(prevLastDate - i);
      }
    }

    let nextDays = [];
    for (let i = 1; i < 7 - nextLastDay; i++) {
      nextDays.push(i);
    }

    let nowDays = [...Array(nextLastDate + 1).keys()].slice(1);
    setCalanderDays(prevDays.concat(nowDays, nextDays));
  };

  useEffect(() => {
    makeDays();
  }, []);

  return (
    <>
      <div className="calander__dayOfWeek__wrapper">
        {dayOftheWeek.map((dow, idx) => (
          <CalanderDOW dayOfWeek={dow} key={dow + idx} />
        ))}
      </div>
      <div className="calander__days__wrapper">
        {calanderDays.map((day, idx) => (
          <CalanderDay day={day} key={day + idx} />
        ))}
      </div>
    </>
  );
}

export default CalanderContents;
