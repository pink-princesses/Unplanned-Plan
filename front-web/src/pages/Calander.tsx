import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CalanderContents from '../components/Calander/CalanderContents';
import CalanderHeader from '../components/Calander/CalanderHeader';
import Todo from '../components/todo/Todo';

import { todosContext } from '../contexts/todosContext';
import '../styles/Calander.scss';
import { drawerContext } from '../contexts/drawerContext';

function Calander() {
  const navigate = useNavigate();

  const [showYear, setShowYear] = useState(new Date().getFullYear());
  const [showMonth, setShowMonth] = useState(new Date().getMonth() + 1);
  const { todoState } = useContext(drawerContext);
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
      <div className="calander__container">
        <CalanderHeader
          showYear={showYear}
          showMonth={showMonth}
          setShowYear={setShowYear}
          setShowMonth={setShowMonth}
        />
        <CalanderContents thisMonth={showMonth} />
      </div>
      <div className={todoState ? 'calander__todo' : 'calander__todo hide'}>
        <Todo />
      </div>
    </div>
  );
}

export default Calander;
