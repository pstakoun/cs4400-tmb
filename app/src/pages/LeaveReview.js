import React from 'react';
import './LeaveReview.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import { stat } from 'fs';
import GeneralButton from '../components/GeneralButton';
import ReviewStars from '../components/ReviewStars';
import 'react-dropdown/style.css';

class LeaveReview extends React.Component {
  constructor(props) {
    super(props);
    this.handleRateShopping = this.handleRateShopping.bind(this);
    this.handleRateSpeed = this.handleRateSpeed.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleNewReview = this.handleNewReview.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      options: [],
      selected: '',
      shoppingRating: 0,
      speedRating: 0,
      comment: '',
    };
  }

  componentWillMount() {
    let initialStations = [];
    fetch('/api/stations')
      .then(res => res.json()).then((data) => {
        if (!data.stations) {
          return;
        }
        initialStations = data.stations.map(stations => stations.name);
        this.setState({
          options: initialStations,
        });
      });
  }

  handleNewReview() {
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        station: this.state.selected.value,
        shopping: this.state.shoppingRating,
        speed: this.state.speedRating,
        comment: this.state.comment,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        alert('You created a review');
      } else {
        alert(data.message);
      }
    });
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

  onSelect(option) {
    // console.log('You selected ', option.label)
    this.setState({ selected: option });
  }

  render() {
    const defaultOption = this.state.selected;

    return (
      <div className="Wrapper">
        <div className="LeaveReview">
          <Dropdown
            options={(this.state.options)}
            value={defaultOption}
            onChange={this.onSelect}
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
            <GeneralButton text="Submit Review" handlePress={this.handleNewReview} />
          </div>
        </div>
      </div>
    );
  }
}

export default LeaveReview;
