import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';
import 'nes.css/css/nes.min.css';

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
  closeTodoState: () => {},
  dragTargetDate: {
    id: 0,
    date: '',
    content: '',
    done: false,
    created_at: '',
    updated_at: '',
  },
};

export const ContextApi = createContext(initialValue);

function App() {
  const [todoState, settodoState] = useState(false);
  const [todoDate, setTodoDate] = useState(initialValue.todoDate);
  const [dragTargetDate, setDragTargetDate] = useState(
    initialValue.dragTargetDate,
  );
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

  const setDragDate = (date: dragTargetDateType) => {
    setDragTargetDate(date);
  };

  const contextValue = {
    todoState: todoState,
    todoDate: todoDate,
    openTodoState: openTodoState,
    toggleTodoState: toggleTodoState,
    closeTodoState: closeTodoState,
    dragTargetDate: dragTargetDate,
    setDragDate: setDragDate,
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
  closeTodoState: () => void;
  dragTargetDate: dragTargetDateType;
}

interface todoDateType {
  year: number;
  month: number;
  day: number;
}

interface dragTargetDateType {
  id: number;
  date: string;
  content: string;
  done: boolean;
  created_at: string;
  updated_at: string;
}
