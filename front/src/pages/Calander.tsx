import { useContext, useEffect, useState } from 'react';
import CalanderContents from '../components/calander/CalanderContents';
import CalanderHeader from '../components/calander/CalanderHeader';
import '../components/calander/Calander.scss';
import Todo from '../components/todo/Todo';
import { ContextApi } from '../App';
import { todosContext } from '../contexts/todosContext';

function Calander() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>('00000000');
  const { todoDate, todoState, toggleTodoState } = useContext(ContextApi);
  const { initiateTodos } = useContext(todosContext);

  const changeCalander = (dir: string) => {
    console.log(dir, 'changeCalander');
  };

  useEffect(() => {
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
    initiateTodos(currentDate);
  }, []);

  return (
    <div className="calander">
      <div className="calander__container">
        <CalanderHeader
          year={year}
          month={month}
          changeCalander={changeCalander}
        />
        <CalanderContents />
        <div
          className={todoState ? 'togle_todo_btn' : 'togle_todo_btn hide'}
          onClick={() => {
            toggleTodoState();
          }}
        >
          {todoState ? '투두닫어' : ''}
        </div>
      </div>
      <div className={todoState ? '' : 'hide'}>
        <Todo />
      </div>
    </div>
  );
}

export default Calander;
