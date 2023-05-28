import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard.js';
import Banner from './Banner.js';
import List from './List.js'
import Test from './Test.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import DashboardDetails from './DashboardDetails.js';

function App() {
  return (
    <>
    <BrowserRouter>
    <div className="App">
      <Banner /> 
      
    </div>

    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='*' element={<Navigate to={<Dashboard />} />} /> 
      <Route path='/home' element={<Dashboard />} />
      <Route path='/DashboardDetails/:id' element={<DashboardDetails />} />
    </Routes>

    </BrowserRouter>

    </>
  );
}

export default App;
