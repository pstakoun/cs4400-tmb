import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    this.updateUser();
  }

  componentDidUpdate() {
    this.updateUser();
  }

  updateUser() {
    fetch('/api/me').then(
      results => results.json(),
    ).then((data) => {
      this.setState({
        user: data,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Home} user={this.state.user} />
          <PublicRoute path="/login" component={Login} user={this.state.user} />
          <PublicRoute path="/register" component={Register} user={this.state.user} />
          <PrivateRoute path="/leaveReview" component={LeaveReview} user={this.state.user} />
          <PrivateRoute path="/viewReviews" component={ViewReviews} user={this.state.user} />
          <PrivateRoute path="/editReview" component={EditReview} user={this.state.user} />
          <PrivateRoute path="/editProfile" component={EditProfile} user={this.state.user} />
          <PrivateRoute path="/stationInfo" component={StationInfo} user={this.state.user} />
          <PrivateRoute path="/buyCard" component={BuyCard} user={this.state.user} />
          <PrivateRoute path="/trip" component={Trip} user={this.state.user} />
          <PrivateRoute path="/viewTrips" component={ViewTrips} user={this.state.user} />
          <PrivateRoute path="/lineSummary" component={LineSummary} user={this.state.user} />
        </Switch>
      </div>
    );
  }
}

export default App;
