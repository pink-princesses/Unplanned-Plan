import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.scss';
import 'nes.css/css/nes.min.css';
import Intro from './pages/Intro';
import Calander from './pages/Calander';
import Login from './pages/Login';
import PersonalSettings from './pages/PersonalSettings';
import TodosProvider from './contexts/todosContext';

import './App.module.scss';

function App() {
  return (
    <TodosProvider>
      {process.env.REACT_APP_PRODUCTION ? (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personalSettings" element={<PersonalSettings />} />
            <Route path="/calander" element={<Calander />} />
          </Routes>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personalSettings" element={<PersonalSettings />} />
            <Route path="/calander" element={<Calander />} />
          </Routes>
        </BrowserRouter>
      )}
    </TodosProvider>
  );
}

export default App;
