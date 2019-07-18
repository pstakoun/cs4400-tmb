import React from 'react';
import './EditReview.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';
import ReviewStars from '../components/ReviewStars.js';
import 'react-dropdown/style.css';

class EditReview extends React.Component {
  constructor(props) {
    super(props);
    this.handleRateShopping = this.handleRateShopping.bind(this);
    this.handleRateSpeed = this.handleRateSpeed.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.state = {
      station: '',
      rid: '',
      shoppingRating: 0,
      speedRating: 0,
      comment: '',
      status: 'pending'
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
        <div className="EditReview">
          <label className={"InfoLabel"}>Edit Review: {this.state.station}</label>
          <label className={"InfoLabel"}>Status: {this.state.status}</label>
          <label className={"InfoLabel"}>ID: {this.state.rid}</label>
          <ReviewStars text="Shopping" rating={this.state.shoppingRating} name="shopping" handleRate={this.handleRateShopping} />
          <ReviewStars text="Connection Speed" rating={this.state.speedRating} name="speed" handleRate={this.handleRateSpeed} />
          <textarea
            rows="5"
            placeholder="Comment here..."
            onChange={this.handleCommentChange}
            value={this.state.comment}
          />
          <div className="ButtonWrapper">
            <Link to={"/home"}>
              <GeneralButton text="Delete Review" />
            </Link>
            <GeneralButton text="Submit Review" />
          </div>
        </div>
      </div>
    );
  }
}

export default EditReview;
