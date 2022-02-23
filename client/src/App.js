import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Container } from '@mui/material';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <Container style={{marginTop:"2vh", marginBottom:"2vh"}}>
      {code ? <Dashboard code={code} /> : <Login />}
    </Container>
  );
}

export default App;
