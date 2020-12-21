import React from 'react';
import './styles/App.css';
import Systeminfo from './routes/Systeminfo';
import About from './routes/About';
import Login from './routes/Login';
import Data from './routes/Data';

import { ProtectedRoute } from './components/ProtectedRoute.js';


import {BrowserRouter as Router, Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <div className="App">
      <Route exact path='/' component={withRouter(Login)}/>
      <ProtectedRoute path='/systeminfo' component={withRouter(Systeminfo)}/>
      <ProtectedRoute path='/about' component={withRouter(About)}/>
      <ProtectedRoute path='/data' component={withRouter(Data)}/>
      </div>
    </Router>
  );
}

export default App;
