import { createContext, useState } from 'react';
import { getAllTodos, getTodos } from '../api/requests';
import { todoType } from '../types';
import { ChildrenProps } from '../types/ChildrenProps';
import cloneDeep from 'lodash';

interface todosType {
  [index: string]: todoType[];
}

export const todosContext = createContext({
  todos: {} as todosType,
  updateDateList: (thisYear: number, thisMonth: number) => {},
  updateTodos: async () => {},
  dayList: [''],
});

export default function TodosProvider({ children }: ChildrenProps) {
  const [todos, setTodos] = useState<todosType>({});
  const [dayList, setDayList] = useState<string[]>([]);

  const updateDateList = (thisYear: number, thisMonth: number) => {
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
    const tmpDateList = [...prevDays, ...nowDays, ...nextDays];
    setDayList(tmpDateList);
  };

  const updateTodos = async () => {
    const firstDate = dayList[0];
    const lastDate = dayList[dayList.length - 1];
    if (!firstDate || !lastDate) return;
    const tmpTodos = {} as todosType;

    dayList.forEach((date) => (tmpTodos[date] = []));

    const response = (await getAllTodos(firstDate, lastDate)).data;
    response.forEach((el: todoType) => tmpTodos[el.date].push(el));
    setTodos(tmpTodos);
  };

  const value = { todos, updateDateList, updateTodos, dayList };
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
