import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';

import Intro from './pages/Intro';
import Calander from './pages/Calander';
import Login from './pages/Login';
import PersonalSettings from './pages/PersonalSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personalSettings" element={<PersonalSettings />} />
        <Route path="/calander" element={<Calander />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
