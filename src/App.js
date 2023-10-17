import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/game';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path='/' element={<Game/>}/>
    </Routes>
  </Router>
  );
}

export default App;
