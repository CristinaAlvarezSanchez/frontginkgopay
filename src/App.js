import './App.css';
import { BreakpointProvider } from 'react-socks';
import Home from './components/users/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/users/Login';
import Registro from './components/users/Registro';
import EditUser from './components/users/EditUser';
import MisGrupos from './components/grupos/MisGrupos';
import FichaGrupo from './components/grupos/FichaGrupo';
import NuevoGrupo from './components/grupos/NuevoGrupo';
import EditarGrupo from './components/grupos/EditarGrupo';
import NuevoGasto from './components/gastos/NuevoGasto';
import EditarGasto from './components/gastos/EditarGasto';
import RepartirGasto from './components/gastos/RepartirGasto';
import Page404 from './components/errores/Page404';



function App() {
  return (
    <BreakpointProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='registro' element={<Registro />} />
            <Route path='editarperfil' element={<EditUser />} />
            <Route path='grupos' element={<MisGrupos />} />
            <Route path='grupos/:idGrupo' element={<FichaGrupo />} />
            <Route path='grupos/nuevogrupo' element={<NuevoGrupo />} />
            <Route path='grupos/nuevogrupo/participantes/:idGrupo' element={<EditarGrupo />} />
            <Route path='gastos/nuevogasto/:idGrupo' element={<NuevoGasto />} />
            <Route path='gastos/nuevogasto/:idGasto/repartir/:idGrupo/:idCreador' element={<RepartirGasto />} />
            <Route path='gastos/editargasto/:idGasto/repartir/:idGrupo' element={<RepartirGasto />} />
            <Route path='gastos/editargasto/:idGasto' element={<EditarGasto />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BreakpointProvider>
  );
}

export default App;
