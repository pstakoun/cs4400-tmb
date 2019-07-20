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
import AddStation from './pages/AddStation';
import AddLine from './pages/AddLine';
import PendingReviews from './pages/PendingReviews';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      path: '',
    };
    this.updateUser = this.updateUser.bind(this);
    this.pathChange = this.pathChange.bind(this);
  }

  componentDidMount() {
    this.updateUser();
  }

  pathChange(path) {
    if (path !== this.state.path) {
      this.setState({
        path,
      });
      this.updateUser();
    }
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
          <PrivateRoute exact path="/" component={Home} user={this.state.user} pathChange={this.pathChange} />
          <PublicRoute path="/login" component={Login} user={this.state.user} pathChange={this.pathChange} />
          <PublicRoute path="/register" component={Register} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/leaveReview" component={LeaveReview} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/viewReviews" component={ViewReviews} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/editReview" component={EditReview} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/editProfile" component={EditProfile} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/stationInfo" component={StationInfo} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/buyCard" component={BuyCard} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/trip" component={Trip} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/viewTrips" component={ViewTrips} user={this.state.user} pathChange={this.pathChange} />
          <PrivateRoute path="/lineSummary" component={LineSummary} user={this.state.user} pathChange={this.pathChange} />
          <AdminRoute path="/addStation" component={AddStation} user={this.state.user} pathChange={this.pathChange} />
          <AdminRoute path="/addLine" component={AddLine} user={this.state.user} pathChange={this.pathChange} />
          <AdminRoute path="/pendingReviews" component={PendingReviews} user={this.state.user} pathChange={this.pathChange} />
        </Switch>
      </div>
    );
  }
}

export default App;
