import React from 'react';
import './Calander.scss';

function CalanderDOW({ dayOfWeek }) {
  return <div className="calander__dayOfWeek__days">{dayOfWeek}</div>;
}

export default CalanderDOW;
