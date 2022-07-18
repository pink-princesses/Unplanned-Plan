import React, { useState } from 'react';
import './Calander.scss';

function CalanderDay({ day }) {
  const [today, setToday] = useState({});
  const TODAY = new Date().getDate();
  return (
    <div className="calander__days">
      <span className={TODAY === day ? 'day__highlight' : null}>{day}</span>
    </div>
  );
}

export default CalanderDay;
