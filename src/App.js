import './App.css';
import { Breakpoint, BreakpointProvider } from 'react-socks';
import Home from './components/users/Home';


function App() {
  return (
    <BreakpointProvider>
      <div className="App">
        <Home></Home>
      </div>
    </BreakpointProvider>
  );
}

export default App;
