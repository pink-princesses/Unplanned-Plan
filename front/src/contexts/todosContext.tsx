import { createContext, useState } from 'react';
import { getTodos } from '../api/requests';
import { todoType } from '../types';
import { ChildrenProps } from '../types/ChildrenProps';

interface todosType {
  [index: string]: todoType[];
}

export const todosContext = createContext({
  todos: {} as todosType,
  initiateTodos: (currentDate: Date) => {},
  updateTodos: (date: string) => {},
  dayList: [''],
});

export default function TodosProvider({ children }: ChildrenProps) {
  const [todos, setTodos] = useState<todosType>({});
  const [dayList, setDayList] = useState<string[]>([]);

  const initiateTodos = async (currentDate: Date) => {
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
    for (const c of [...prevDays, ...nowDays, ...nextDays]) {
      const tmp = new Promise((resolve, reject) => {
        getTodos(c)
          .then((response) => {
            todos[c] = response.data;
            resolve('success');
          })
          .catch(() => {
            reject();
          });
      });
      promiseQueue.push(tmp);
    }
    await Promise.all(promiseQueue);
    setDayList(Object.keys(todos));
  };

  const updateTodos = (date: string) => {
    const tmp = JSON.parse(JSON.stringify(todos));
    getTodos(date)
      .then((response) => {
        tmp[date] = response.data;
        setTodos(tmp);
      })
      .catch(() => {
        alert('추가 못함');
      });
  };

  const value = { todos, initiateTodos, updateTodos, dayList };
  return (
    <todosContext.Provider value={value}>{children}</todosContext.Provider>
  );
}

function getPrevMonthDate(
  year: number,
  month: number,
  lastDay: number,
  lastDate: number,
) {
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

function getNextMonthDate(year: number, month: number, lastDay: number) {
  const result = [];
  for (let i = 1; i < 7 - lastDay; i++) {
    result.push(
      `${year}` + `${month}`.padStart(2, '0') + `${i}`.padStart(2, '0'),
    );
  }

  return result;
}

function getThisMonthDate(year: number, month: number, lastDate: number) {
  const result = [];
  for (let i = 1; i <= lastDate; i++) {
    result.push(
      `${year}` + `${month}`.padStart(2, '0') + `${i}`.padStart(2, '0'),
    );
  }

  return result;
}
