import { createContext, useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';

import Intro from './pages/Intro';
import Calander from './pages/Calander';
import Login from './pages/Login';
import PersonalSettings from './pages/PersonalSettings';

type initialValueType = {
  todoState: boolean;
  todoDate: todoDateType;
  openTodoState: any;
  toggleTodoState: any;
};

type todoDateType = {
  year: number;
  month: number;
  day: number;
};

const initialValue: initialValueType = {
  todoState: false,
  todoDate: { year: 0, month: 0, day: 0 },
  openTodoState: () => null,
  toggleTodoState: () => null,
};

export const ContextApi = createContext(initialValue);

function App() {
  const [todoState, settodoState] = useState(false);
  const [todoDate, setTodoDate] = useState(initialValue.todoDate);
  const openTodoState = (date: todoDateType) => {
    console.log(date, '오픈투두스테이트');
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
  const contextValue = {
    todoState: todoState,
    todoDate: todoDate,
    openTodoState: openTodoState,
    toggleTodoState: toggleTodoState,
  };

  return (
    <ContextApi.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/personalSettings" element={<PersonalSettings />} />
          <Route path="/calander" element={<Calander />} />
        </Routes>
      </BrowserRouter>
    </ContextApi.Provider>
  );
}

export default App;
