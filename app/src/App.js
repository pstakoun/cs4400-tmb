import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LeaveReview from './pages/LeaveReview';
import Home from './pages/Home';
import EditReview from './pages/EditReview';
import BuyCard from './pages/BuyCard';
import ViewReviews from './pages/ViewReviews';


import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/leaveReview" component={LeaveReview} />
        <Route path="/buyCard" component={BuyCard} />
        <Route path="/editReview" component={EditReview} />
        <Route path="/viewReviews" component={ViewReviews} />
      </Switch>
    </div>
  );
}

export default App;
