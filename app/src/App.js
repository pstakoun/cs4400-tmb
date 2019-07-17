import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PassengerHome from './pages/PassengerHome';
import  AdminHome from './pages/AdminHome';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/passHome" component={PassengerHome} />
        <Route exact path="/adminHome" component={AdminHome} />

      </Switch>
    </div>
  );
}

export default App;
