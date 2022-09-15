import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';
import 'nes.css/css/nes.min.css';
import Intro from './pages/Intro';
import Calander from './pages/Calander';
import Login from './pages/Login';
import PersonalSettings from './pages/PersonalSettings';
import Customer from './pages/Customer';
import TodosProvider from './contexts/todosContext';

import './App.module.scss';

function App() {
  return (
    <TodosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/personalSettings" element={<PersonalSettings />} />
          <Route path="/calander" element={<Calander />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </TodosProvider>
  );
}

export default App;
