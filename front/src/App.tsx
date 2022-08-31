import { HashRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';
import 'nes.css/css/nes.min.css';
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
        <HashRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personalSettings" element={<PersonalSettings />} />
            <Route path="/calander" element={<Calander />} />
          </Routes>
        </HashRouter>
      </TodosProvider>
    </DrawerProvider>
  );
}

export default App;
