import React from 'react';
import './LeaveReview.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';
import ReviewStars from '../components/ReviewStars.js';
import 'react-dropdown/style.css';

class LeaveReview extends React.Component {
  constructor(props) {
    super(props);
    this.handleRateShopping = this.handleRateShopping.bind(this);
    this.handleRateSpeed = this.handleRateSpeed.bind(this);
    this.state = {
      options: [],
      defaultOption: '',
    };
  }

  handleRateShopping(rating) {
    console.log(`Shopping Rating is: ${rating}`);
  }

  handleRateSpeed(rating) {
    console.log(`Connection Speed Rating is: ${rating}`);
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="LeaveReview">
          <Dropdown options={this.state.options} onChange={this._onSelect} value={this.state.defaultOption} placeholder="Select a Station" />
          <ReviewStars text="Shopping" name="shopping" handleRate={this.handleRateShopping} />
          <ReviewStars text="Connection Speed" name="speed" handleRate={this.handleRateSpeed} />
          <textarea
            rows="5"
            placeholder="Comment here..."
          />
          <div className="ButtonWrapper">
            <GeneralButton text="Submit Review" />
          </div>
        </div>
      </div>
    );
  }
}

export default LeaveReview;
