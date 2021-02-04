import './App.css';
// import { Button } from '@material-ui/core';
import Routers from './routes'
import {BrowserRouter as Router} from 'react-router-dom'

import { createBrowserHistory } from 'history';
const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>  
        <Routers/>
    </Router>
  );
}

export default App;
