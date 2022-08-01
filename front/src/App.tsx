import { createContext, useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';

import Intro from './pages/Intro';
import Calander from './pages/Calander';
import Login from './pages/Login';
import PersonalSettings from './pages/PersonalSettings';

type initialValueType = {
  todoState: boolean;
  toggleTodoState: any;
};

const initialValue: initialValueType = {
  todoState: false,
  toggleTodoState: () => null,
};

export const ContextApi = createContext(initialValue);

function App() {
  const [todoState, settodoState] = useState(false);
  const toggleTodoState = () => {
    settodoState((prev) => {
      return !prev;
    });
  };
  const contextValue = {
    todoState: todoState,
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
