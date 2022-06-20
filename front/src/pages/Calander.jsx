import React, { useEffect, useState } from 'react';
import CalanderContents from '../components/Calander/CalanderContents';
import CalanderHeader from '../components/Calander/CalanderHeader';
import '../components/Calander/Calander.scss';

function Calander() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
  }, []);

  return (
    <div className="calander">
      <CalanderHeader year={year} month={month} />
      <CalanderContents currentDate={currentDate} />
    </div>
  );
}

export default Calander;
