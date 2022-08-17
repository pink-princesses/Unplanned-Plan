import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Intro from './pages/Intro';
import Calander from './pages/Calander';
import Login from './pages/Login';
import PersonalSettings from './pages/PersonalSettings';
import TodosProvider from './contexts/todosContext';
import DrawerProvider from './contexts/drawerContext';

import './App.module.scss';

function App() {
  return (
    <DrawerProvider>
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
    </DrawerProvider>
  );
}

export default App;
