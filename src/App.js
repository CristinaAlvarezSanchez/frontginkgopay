import './App.css';
import { BreakpointProvider } from 'react-socks';
import Home from './components/users/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/users/Login';
import Registro from './components/users/Registro';
import MisGrupos from './components/grupos/MisGrupos';


function App() {
  return (
    <BreakpointProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='registro' element={<Registro />} />
            <Route path='mis-grupos' element={<MisGrupos />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BreakpointProvider>
  );
}

export default App;
