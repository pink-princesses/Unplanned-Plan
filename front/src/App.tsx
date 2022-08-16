import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';

import Intro from './pages/Intro';
import Calander from './pages/Calander';
import Login from './pages/Login';
import PersonalSettings from './pages/PersonalSettings';
import TodosProvider from './contexts/todosContext';

const initialValue: initialValueType = {
  todoState: false,
  todoDate: { year: 0, month: 0, day: 0 },
  openTodoState: () => {},
  toggleTodoState: () => {},
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
      <TodosProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personalSettings" element={<PersonalSettings />} />
            <Route path="/calander" element={<Calander />} />
          </Routes>
        </BrowserRouter>
      </TodosProvider>
    </ContextApi.Provider>
  );
}

export default App;

interface initialValueType {
  todoState: boolean;
  todoDate: todoDateType;
  openTodoState: (date: todoDateType) => void;
  toggleTodoState: () => void;
}

interface todoDateType {
  year: number;
  month: number;
  day: number;
}
