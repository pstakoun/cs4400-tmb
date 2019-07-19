import React from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import './Home.css';

class PassengerHome extends React.Component {
  render() {
    return (
      <div className="Wrapper">
        <div className="Cards">
          <div className="ButtonWrapper">
            <header>
              <h2>Welcome Passenger!</h2>
            </header>
            <b className="b">Actions:</b>
            <Link to="/LeaveReview">
              <GeneralButton text="Leave Review" />
            </Link>
            <Link to="/ViewReviews">
              <GeneralButton text="View Reviews" />
            </Link>
            <Link to="/BuyCard">
              <GeneralButton text="Buy Card" />
            </Link>
            <Link to="/Trip">
              <GeneralButton text="Go on Trip" />
            </Link>
            <Link to="/ViewTrips">
              <GeneralButton text="View Trips" />
            </Link>
            <Link to="/EditProfile">
              <GeneralButton text="Edit Profile" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PassengerHome;
