import React from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton.js';
import './PassHome.css';


function PassengerHome() {
  return (

    <div className="Wrapper">

      <div className="Cards">

        <div className="ButtonWrapper">
          <header>
            <h2>Welcome Passenger!</h2>
          </header>

          <b className="b">
Actions:
          </b>
          <Link to="/LeaveReview">
            <GeneralButton text="Leave Review" />
          </Link>
          <Link to="/ViewReviews">
            <GeneralButton text="View Reviews" />
          </Link>
          <Link to="/BuyCard">
            <GeneralButton text="Buy Card" />
          </Link>
          <GeneralButton text="Go on Trip" />
          <GeneralButton text="View Trips" />
          <GeneralButton text="Edit Profile" />
        </div>
      </div>
    </div>
  );
}

export default PassengerHome;
