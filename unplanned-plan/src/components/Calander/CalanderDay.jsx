import React from 'react';
import './Calander.scss';

function CalanderDay({ day }) {
  return <div className="calander__days">{day}</div>;
}

export default CalanderDay;
