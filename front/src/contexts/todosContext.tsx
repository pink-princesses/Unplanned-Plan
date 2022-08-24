import { createContext, useState } from 'react';

import { getPrevMonthDate, getThisMonthDate, getNextMonthDate } from '../utils';
import { getAllTodos } from '../api/requests';
import { ChildrenProps } from '../types/ChildrenProps';
import { todoType } from '../types';

interface todosType {
  [index: string]: todoType[];
}

export const todosContext = createContext({
  todos: {} as todosType,
  updateDateList: (year: number, month: number) => {},
  updateTodos: async () => {},
  dayList: [''],
});

export default function TodosProvider({ children }: ChildrenProps) {
  const [todos, setTodos] = useState<todosType>({});
  const [dayList, setDayList] = useState<string[]>([]);

  const updateDateList = (year: number, month: number) => {
    const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
    const prevMonthLastDayOfWeek = new Date(year, month - 1, 0).getDay();
    const thisMonthLastDate = new Date(year, month, 0).getDate();
    const thisMonthFirstDayOfWeek = new Date(year, month, 0).getDay();

    const prevDays = getPrevMonthDate(
      year,
      month - 1,
      prevMonthLastDayOfWeek,
      prevMonthLastDate,
    );
    const nextDays = getNextMonthDate(year, month + 1, thisMonthFirstDayOfWeek);
    const nowDays = getThisMonthDate(year, month, thisMonthLastDate);

    const tmpDateList = [...prevDays, ...nowDays, ...nextDays];
    setDayList(tmpDateList);
  };

  const updateTodos = async () => {
    const firstDate = dayList[0];
    const lastDate = dayList[dayList.length - 1];

    if (!firstDate || !lastDate) return;
    const tmpTodos = {} as todosType;

    dayList.forEach((date) => (tmpTodos[date] = []));

    try {
      const response = (await getAllTodos(firstDate, lastDate)).data;
      response.forEach((el: todoType) => tmpTodos[el.date].push(el));
      setTodos(tmpTodos);
    } catch (error) {
      alert('TODO LIST를 불러오지 못했습니다');
    }
  };

  const value = { todos, updateDateList, updateTodos, dayList };
  return (
    <todosContext.Provider value={value}>{children}</todosContext.Provider>
  );
}
