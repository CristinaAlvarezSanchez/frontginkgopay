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
import Inbox from './components/mensajeria/Inbox';
import VerMensaje from './components/mensajeria/VerMensaje';
import EnviarMensaje from './components/mensajeria/EnviarMensaje';
import LoggedProvider from './providers/LoggedProvider';
import LoginGuard from './guards/LoginGuard';



function App() {
  return (
    <LoggedProvider>
      <BreakpointProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='' element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='registro' element={<Registro />} />

              <Route path='editarperfil' element={<LoginGuard><EditUser /></LoginGuard>} />
              <Route path='grupos' element={<LoginGuard><MisGrupos /></LoginGuard>} />
              <Route path='grupos/:idGrupo' element={<LoginGuard><FichaGrupo /></LoginGuard>} />
              <Route path='grupos/nuevogrupo' element={<LoginGuard><NuevoGrupo /></LoginGuard>} />
              <Route path='grupos/nuevogrupo/participantes/:idGrupo' element={<LoginGuard><EditarGrupo /></LoginGuard>} />
              <Route path='gastos/nuevogasto/:idGrupo' element={<LoginGuard><NuevoGasto /></LoginGuard>} />
              <Route path='gastos/nuevogasto/:idGasto/repartir/:idGrupo/:idCreador' element={<LoginGuard><RepartirGasto /></LoginGuard>} />
              <Route path='gastos/editargasto/:idGasto/repartir/:idGrupo' element={<LoginGuard><RepartirGasto /></LoginGuard>} />
              <Route path='gastos/editargasto/:idGasto' element={<LoginGuard><EditarGasto /></LoginGuard>} />
              <Route path='mensajes/inbox' element={<LoginGuard><Inbox /></LoginGuard>} />
              <Route path='mensajes/:mensajeId' element={<LoginGuard><VerMensaje /></LoginGuard>} />
              <Route path='mensajes/new' element={<LoginGuard><EnviarMensaje /></LoginGuard>} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </div>
        </BrowserRouter>
      </BreakpointProvider>
    </LoggedProvider>
  );
}

export default App;
