import React from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import './Home.css';

class AdminHome extends React.Component {
  render() {
    return (
      <div className="Wrapper">
        <div className="Cards">
          <div className="ButtonWrapper">
            <header>
              <h2>Welcome Admin!</h2>
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
            <Link to="/editProfile">
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
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
