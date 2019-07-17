import React from 'react';
import './LeaveReview.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';
import ReviewStars from '../components/ReviewStars.js';

class LeaveReview extends React.Component {
  render()
  {
    return (
      <div className="Wrapper">
        <div className="LeaveReview">
          <ReviewStars text={"Shopping"}/>
          <ReviewStars text={"Connection Speed"}/>
          <textarea
            rows="5"

          />
        </div>
      </div>
    );
  }
}

export default LeaveReview;
