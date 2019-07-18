import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LeaveReview from './pages/LeaveReview';
import PassengerHome from './pages/PassengerHome';
import AdminHome from './pages/AdminHome';
import Home from './pages/Home';
import EditReview from './pages/EditReview'
import BuyCard from './pages/BuyCard';


import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/leaveReview" component={LeaveReview} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/passengerHome" component={PassengerHome} />
        <Route exact path="/buyCard" component={BuyCard} />
        <Route exact path="/editReview" component={EditReview} />
      </Switch>
    </div>
  );
}

export default App;
