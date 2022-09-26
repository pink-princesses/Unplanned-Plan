import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CalanderContents from '../components/Calander/CalanderContents';
import CalanderHeader from '../components/Calander/CalanderHeader';

import { todosContext } from '../contexts/todosContext';
import '../styles/Calander.scss';

function Calander() {
  const navigate = useNavigate();

  const [showYear, setShowYear] = useState(new Date().getFullYear());
  const [showMonth, setShowMonth] = useState(new Date().getMonth() + 1);
  const { dayList, updateDateList, updateTodos } = useContext(todosContext);

  useEffect(() => {
    updateDateList(showYear, showMonth);
  }, [showYear, showMonth]);

  useEffect(() => {
    (async () => {
      try {
        await updateTodos();
      } catch (error) {
        alert('TODO LIST를 불러오지 못했습니다.');
        localStorage.clear();
        navigate('/');
      }
    })();
  }, [dayList]);

  return (
    <div className="calander">
      <CalanderHeader
        showYear={showYear}
        showMonth={showMonth}
        setShowYear={setShowYear}
        setShowMonth={setShowMonth}
      />
      <CalanderContents />
    </div>
  );
}

export default Calander;
