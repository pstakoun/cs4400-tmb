import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import './Home.css';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    fetch('/api/users/logout', {
      method: 'POST',
    })
      .then(res => res.json()).then((data) => {
        if (data.success) {
          this.setState({
            loggedOut: true,
          });
        }
      });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Cards">
          <div className="ButtonWrapper">
            <header>
              <h2>
                Welcome
                {this.props.user ? (` ${this.props.user.first_name} ${this.props.user.last_name}`) : null}
              </h2>
            </header>
            <b className="b">Actions:</b>
            <Link to="/viewTrips">
              <GeneralButton text="View Trips" />
            </Link>
            <Link to="/buyCard">
              <GeneralButton text="Buy Card" />
            </Link>
            <Link to="/trip">
              <GeneralButton text="Go on Trip" />
            </Link>
            <Link to="/EditAdmin">
              <GeneralButton text="Edit Profile" />
            </Link>
            <Link to="/addStation">
              <GeneralButton text="Add Station" />
            </Link>
            <Link to="/addLine">
              <GeneralButton text="Add Line" />
            </Link>
            <Link to="/pendingReviews">
              <GeneralButton text="Review Passenger Reviews" />
            </Link>
            <GeneralButton text="Log Out" handlePress={this.handleLogout} />
            { this.state.loggedOut ? <Redirect to="/login" /> : null }
          </div>
        </div>
      </div>
    );
  }
}
export default AdminHome;
