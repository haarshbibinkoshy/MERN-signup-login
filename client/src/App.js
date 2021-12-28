import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
     <Routes>

     <Route path="/signup" element={<Signup/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
     
     
     </Routes>
    
     </BrowserRouter>
    </div>
  );
}

export default App;
