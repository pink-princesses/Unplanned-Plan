import React, { useState } from 'react';
import './Calander.scss';

function CalanderDay({ year, month, day }) {
  const [today, setToday] = useState({});
  const TODAY = new Date().getDate();
  const tempShowDate = () => {
    console.log(year, month, day);
  };

  return (
    <div className="calander__days">
      <div className="calander__days__top">
        <span className={TODAY === day ? 'day__highlight' : null}>{day}</span>
        <span className="calander__addbtn" onClick={tempShowDate}>
          +
        </span>
      </div>
      <div className="calander__days__btm">
        <span>하이루</span>
      </div>
    </div>
  );
}

export default CalanderDay;
