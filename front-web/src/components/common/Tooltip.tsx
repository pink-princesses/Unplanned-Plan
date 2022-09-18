import React from 'react';
import '../../styles/Tooltip.scss';

/**
 * 툴팁 위치는 하단 고정
 * direction : 정렬 방향 left, center, right
 */

interface Props {
  direction: string;
  message: string;
  children: any;
}

function Tooltip({ children, direction = 'left', message }: Props) {
  return (
    <span className="tooltip__container">
      {children}
      <div className={`tooltip ${direction}`}>
        <p>{message}</p>
      </div>
    </span>
  );
}

export default Tooltip;
