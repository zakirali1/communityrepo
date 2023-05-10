import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard.js';
import Banner from './Banner.js';
import List from './List.js'
import Test from './Test.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <Banner /> 
      <Container className="wrapper-card"fluid>
          <Row>
           
      <List /> 
  
  </Row>
  </Container>
      <Dashboard />
      <Test />
    </div>
  );
}

export default App;
