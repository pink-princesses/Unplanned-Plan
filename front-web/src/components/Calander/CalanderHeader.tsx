import React, { useContext } from 'react';
import { drawerContext } from '../../contexts/drawerContext';
import '../../styles/CalanderHeader.scss';

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
        break;
      case 'next':
        if (showMonth >= 12) {
          setShowYear((pre) => pre + 1);
          setShowMonth(1);
        } else {
          setShowMonth((pre) => pre + 1);
        }
        break;
    }
  };

  return (
    <div className="header">
      <h1>
        {showYear}년 {showMonth}월
      </h1>
      <div className="btns">
        <button
          className="nes-btn btn prev"
          onClick={() => {
            changeCalander('prev');
          }}
        >
          &lt;
        </button>
        <button
          className="nes-btn btn next"
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
