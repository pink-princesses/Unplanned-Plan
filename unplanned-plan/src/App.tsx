import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Intro from './pages/Intro';
import './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
