import { useState } from 'react';
import '../../styles/CalanderHeader.scss';
import Tooltip from '../common/Tooltip';

function CalanderHeader({
  showYear,
  showMonth,
  setShowYear,
  setShowMonth,
}: Props) {
  const [isDark, setIsDark] = useState(false);
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

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="header">
      <div className="btns lefts">
        <button className="btn logout">✅</button>
        <button className="btn customer">📞</button>
        <button className="btn dark" onClick={handleDarkMode}>
          {isDark ? '🌜' : '🌞'}
        </button>
      </div>
      <h1 className="header__date">
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
