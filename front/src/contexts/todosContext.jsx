import { createContext, useState } from 'react';
import { getTodos } from '../api/requests';
import { defaultTodo } from '../types';

export const todosContext = createContext(defaultTodo);

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState({});

  const initiateTodos = async (currentDate) => {
    const thisYear = currentDate.getFullYear();
    const thisMonth = currentDate.getMonth() + 1;

    const prevMonthLastDate = new Date(thisYear, thisMonth - 1, 0).getDate();
    const prevMonthLastDayOfWeek = new Date(
      thisYear,
      thisMonth - 1,
      0,
    ).getDay();
    const nextMonthLastDate = new Date(thisYear, thisMonth, 0).getDate();
    const nextMonthFirstDayOfWeek = new Date(thisYear, thisMonth, 0).getDay();

    const prevDays = getPrevMonthDate(
      thisYear,
      thisMonth - 1,
      prevMonthLastDayOfWeek,
      prevMonthLastDate,
    );

    const nextDays = getNextMonthDate(
      thisYear,
      thisMonth + 1,
      nextMonthFirstDayOfWeek,
    );
    const nowDays = getThisMonthDate(thisYear, thisMonth, nextMonthLastDate);

    const promiseQueue = [];
    for (let c of [...prevDays, ...nowDays, ...nextDays]) {
      const tmp = new Promise((resolve, reject) => {
        getTodos(c)
          .then((response) => {
            todos[c] = response.data;
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
      promiseQueue.push(tmp);
    }
    await Promise.all(promiseQueue);
  };

  const updateTodos = (date, todo) => {
    const tmp = JSON.parse(JSON.stringify(todos));
    tmp[date] = todo;
    setTodos(tmp);
  };

  const value = { todos, initiateTodos, updateTodos };
  return (
    <todosContext.Provider value={value}>{children}</todosContext.Provider>
  );
}

function getPrevMonthDate(year, month, lastDay, lastDate) {
  const result = [];
  if (lastDay !== 6) {
    for (let i = 0; i < lastDay + 1; i++) {
      result.unshift(
        `${year}` + `${month}`.padStart(2, '0') + `${lastDate - i}`,
      );
    }
  }

  return result;
}

function getNextMonthDate(year, month, lastDay) {
  const result = [];
  for (let i = 1; i < 7 - lastDay; i++) {
    result.push(
      `${year}` + `${month}`.padStart(2, '0') + `${i}`.padStart(2, '0'),
    );
  }

  return result;
}

function getThisMonthDate(year, month, lastDate) {
  const result = [];
  for (let i = 1; i <= lastDate; i++) {
    result.push(
      `${year}` + `${month}`.padStart(2, '0') + `${i}`.padStart(2, '0'),
    );
  }

  return result;
}
