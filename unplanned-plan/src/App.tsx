import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Intro from './pages/Intro';
import Calander from './pages/Calander';
import './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/calander" element={<Calander />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
