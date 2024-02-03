import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Home</h1>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />
    </Routes>
  );
}

export default App;
