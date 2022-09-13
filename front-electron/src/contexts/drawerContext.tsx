import React, { createContext, useState } from 'react';

const initialValue: initialValueType = {
  todoState: false,
  todoDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  },
  openTodoState: () => {},
  toggleTodoState: () => {},
  closeTodoState: () => {},
};

export const drawerContext = createContext(initialValue);

interface initialValueType {
  todoState: boolean;
  todoDate: todoDateType;
  openTodoState: (date: todoDateType) => void;
  toggleTodoState: () => void;
  closeTodoState: () => void;
}

export default function DrawerProvider({ children }: Props) {
  const [todoState, settodoState] = useState(true);
  const [todoDate, setTodoDate] = useState(initialValue.todoDate);
  const openTodoState = (date: todoDateType) => {
    setTodoDate(date);
    // settodoState(() => {
    //   return true;
    // });
  };
  const toggleTodoState = () => {
    settodoState((prev) => {
      return !prev;
    });
  };
  const closeTodoState = () => {
    settodoState(() => {
      return false;
    });
  };

  const value = {
    todoState: todoState,
    todoDate: todoDate,
    openTodoState: openTodoState,
    toggleTodoState: toggleTodoState,
    closeTodoState: closeTodoState,
  };

  return (
    <drawerContext.Provider value={value}>{children}</drawerContext.Provider>
  );
}

interface Props {
  children: React.ReactNode;
}

interface todoDateType {
  year: number;
  month: number;
  day: number;
}
