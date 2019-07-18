import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
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
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/leaveReview" component={LeaveReview} />
        <PrivateRoute path="/buyCard" component={BuyCard} />
        <PrivateRoute path="/editReview" component={EditReview} />
        <PrivateRoute path="/viewReviews" component={ViewReviews} />
      </Switch>
    </div>
  );
}

export default App;
