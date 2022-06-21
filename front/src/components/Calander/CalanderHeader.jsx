import React, { useEffect, useState } from 'react';

function CalanderHeader({ year, month }) {
  const [displayMonth, setDiaplayMonth] = useState('오늘');

  return (
    <div className="calander__header">
      <h1 className="calander__header__title">
        {year}년 {month}월
      </h1>
      <div className="calander__header__btn__wrapper">
        <button className="calander__header__btn btn__prev">&lt;</button>
        <button className="calander__header__btn btn__center">
          {displayMonth}
        </button>
        <button className="calander__header__btn btn__next">&gt;</button>
      </div>
    </div>
  );
}

export default CalanderHeader;
