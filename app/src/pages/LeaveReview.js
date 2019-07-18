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
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.state = {
      options: [],
      defaultOption: '',
      shoppingRating: 0,
      speedRating: 0,
      comment: '',
      status: 'pending',
    };
  }

  handleRateShopping(rating) {
    console.log(`Shopping Rating is: ${this.state.shoppingRating}`);
    this.setState({ shoppingRating: rating });
  }

  handleRateSpeed(rating) {
    console.log(`Connection Speed Rating is: ${rating}`);
    this.setState({ speedRating: rating });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="LeaveReview">
          <Dropdown
            options={this.state.options}
            onChange={this._onSelect}
            value={this.state.defaultOption}
            placeholder="Select a Station"
          />
          <ReviewStars text="Shopping" rating={this.state.shoppingRating} name="shopping" handleRate={this.handleRateShopping} />
          <ReviewStars text="Connection Speed" rating={this.state.speedRating} name="speed" handleRate={this.handleRateSpeed} />
          <textarea
            rows="5"
            placeholder="Comment here..."
            onChange={this.handleCommentChange}
            value={this.state.comment}
          />
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
            <GeneralButton text="Submit Review" />
          </div>
        </div>
      </div>
    );
  }
}

export default LeaveReview;
