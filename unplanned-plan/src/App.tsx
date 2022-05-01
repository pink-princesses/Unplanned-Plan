import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';

import Intro from './pages/Intro';
import PersonalSettings from './pages/PersonalSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/personalSettings" element={<PersonalSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
