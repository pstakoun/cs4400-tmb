import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LeaveReview from './pages/LeaveReview';
import ViewReviews from './pages/ViewReviews';
import EditReview from './pages/EditReview';
import EditProfile from './pages/EditProfile';
import StationInfo from './pages/StationInfo';
import BuyCard from './pages/BuyCard';
import Trip from './pages/Trip';
import ViewTrips from './pages/ViewTrips';
import LineSummary from './pages/LineSummary';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/leaveReview" component={LeaveReview} />
        <PrivateRoute path="/viewReviews" component={ViewReviews} />
        <PrivateRoute path="/editReview" component={EditReview} />
        <PrivateRoute path="/editProfile" component={EditProfile} />
        <PrivateRoute path="/stationInfo" component={StationInfo} />
        <PrivateRoute path="/buyCard" component={BuyCard} />
        <PrivateRoute path="/trip" component={Trip} />
        <PrivateRoute path="/viewTrips" component={ViewTrips} />
        <PrivateRoute path="/lineSummary" component={LineSummary} />
      </Switch>
    </div>
  );
}

export default App;
