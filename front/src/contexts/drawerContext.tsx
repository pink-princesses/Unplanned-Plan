import React, { createContext, useState } from 'react';

const initialValue: initialValueType = {
  todoState: false,
  todoDate: { year: 0, month: 0, day: 0 },
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
  const [todoState, settodoState] = useState(false);
  const [todoDate, setTodoDate] = useState(initialValue.todoDate);
  const openTodoState = (date: todoDateType) => {
    setTodoDate(date);
    settodoState(() => {
      return true;
    });
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
