import React from 'react';
import GeneralButton from '../components/GeneralButton.js';
import './PassHome.css';
import { Link } from 'react-router-dom';

function AdminHome() {
  return (

    <div className="Wrapper">

      <div className="Cards">

        <div className="ButtonWrapper">
          <header>
            <h2>Welcome Admin!</h2>
          </header>

          <b className="b">Actions:</b>
          <GeneralButton text="View Trips" />
          <Link to="/BuyCard">
            <GeneralButton text="Buy Card" />
          </Link>
          <GeneralButton text="Go on Trip" />
          <GeneralButton text="Edit Profile" />
          <GeneralButton text="Add Station" />
          <GeneralButton text="Add Line" />
          <GeneralButton text="Review Passenger Reviews" />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
