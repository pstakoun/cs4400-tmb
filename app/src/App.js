import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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
import EditAdmin from './pages/EditAdmin';

import StationInfo from './pages/StationInfo';
import StationInfoAdmin from './pages/StationInfoAdmin';
import BuyCard from './pages/BuyCard';
import Trip from './pages/Trip';
import ViewTrips from './pages/ViewTrips';
import UpdateTrip from './pages/UpdateTrip';
import LineSummary from './pages/LineSummary';
import AddStation from './pages/AddStation';
import AddLine from './pages/AddLine';
import PendingReviews from './pages/PendingReviews';
import NotFound from './pages/NotFound';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.updateUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
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
          <PrivateRoute exact path="/" component={Home} user={this.state.user} on />
          <PublicRoute path="/login" component={Login} user={this.state.user} />
          <PublicRoute path="/register" component={Register} user={this.state.user} />
          <PrivateRoute path="/leaveReview" component={LeaveReview} user={this.state.user} />
          <PrivateRoute path="/viewReviews" component={ViewReviews} user={this.state.user} />
          <PrivateRoute path="/editReview" component={EditReview} user={this.state.user} />
          <PrivateRoute path="/editProfile" component={EditProfile} user={this.state.user} />
          <PrivateRoute path="/editAdmin" component={EditAdmin} user={this.state.user} />

          <PrivateRoute path="/stationInfo" component={StationInfo} user={this.state.user} />
          <PrivateRoute path="/stationInfoAdmin" component={StationInfoAdmin} user={this.state.user} />
          <PrivateRoute path="/buyCard" component={BuyCard} user={this.state.user} />
          <PrivateRoute path="/trip" component={Trip} user={this.state.user} />
          <PrivateRoute path="/viewTrips" component={ViewTrips} user={this.state.user} />
          <PrivateRoute path="/updateTrip" component={UpdateTrip} user={this.state.user} />
          <PrivateRoute path="/lineSummary" component={LineSummary} user={this.state.user} />
          <AdminRoute path="/addStation" component={AddStation} user={this.state.user} />
          <AdminRoute path="/addLine" component={AddLine} user={this.state.user} />
          <AdminRoute path="/pendingReviews" component={PendingReviews} user={this.state.user} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(props => <App {...props} />);
