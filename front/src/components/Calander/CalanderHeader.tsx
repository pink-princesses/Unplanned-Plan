import React, { useContext, useEffect, useState } from 'react';
import { drawerContext } from '../../contexts/drawerContext';

function CalanderHeader({
  showYear,
  showMonth,
  setShowYear,
  setShowMonth,
}: Props) {
  const { closeTodoState } = useContext(drawerContext);
  const changeCalander = (dir: string) => {
    switch (dir) {
      case 'prev':
        if (showMonth <= 1) {
          setShowYear((pre) => pre - 1);
          setShowMonth(12);
        } else {
          setShowMonth((pre) => pre - 1);
        }
        closeTodoState();
        break;
      case 'next':
        if (showMonth >= 12) {
          setShowYear((pre) => pre + 1);
          setShowMonth(1);
        } else {
          setShowMonth((pre) => pre + 1);
        }
        closeTodoState();
        break;
    }
  };

  return (
    <div className="calander__header">
      <h1 className="calander__header__title">
        {showYear}년 {showMonth}월
      </h1>
      <div className="calander__header__btn__wrapper">
        <button
          className="calander__header__btn btn__prev"
          onClick={() => {
            changeCalander('prev');
          }}
        >
          &lt;
        </button>
        <button
          className="calander__header__btn btn__next"
          onClick={() => {
            changeCalander('next');
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default CalanderHeader;

interface Props {
  showYear: number;
  showMonth: number;
  setShowYear: React.Dispatch<React.SetStateAction<number>>;
  setShowMonth: React.Dispatch<React.SetStateAction<number>>;
}
