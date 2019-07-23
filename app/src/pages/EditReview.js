import React from 'react';
import './EditReview.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import ReviewStars from '../components/ReviewStars';
import 'react-dropdown/style.css';

class EditReview extends React.Component {
  constructor(props) {
    super(props);
    this.handleRateShopping = this.handleRateShopping.bind(this);
    this.handleRateSpeed = this.handleRateSpeed.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleUpdateReview = this.handleUpdateReview.bind(this);
    this.handleDeleteReview = this.handleDeleteReview.bind(this);
    this.state = {
      station: '',
      rid: this.props.location.state.rid,
      shoppingRating: 0,
      speedRating: 0,
      comment: '',
      status: 'pending',
      changed: false,
    };
  }

  componentWillMount() {
    fetch(`/api/reviews/${this.state.rid}`).then(
      results => results.json(),
    ).then((data) => {
      const { review } = data;
      this.setState({
        station: review.station_name,
        shoppingRating: review.shopping,
        speedRating: review.connection_speed,
        comment: review.comment,
      });
    });
  }

  handleUpdateReview() {
    fetch(`/api/reviews/${this.state.rid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        station: this.state.station,
        shopping: this.state.shoppingRating,
        speed: this.state.speedRating,
        comment: this.state.comment,
      }),
    }).then(res => res.json()).then((data) => {
      alert(data.message);
    });
  }

  handleDeleteReview() {
    fetch(`/api/reviews/${this.state.rid}`, {
      method: 'DELETE',
    }).then(res => res.json()).then((data) => {
      alert(data.message);
    });
  }

  handleRateShopping(rating) {
    this.setState({ shoppingRating: rating, changed: true });
  }

  handleRateSpeed(rating) {
    this.setState({ speedRating: rating, changed: true });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value, changed: true });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="EditReview">
          <label className="InfoLabel">
            {'Edit Review: '}
            {this.state.station}
          </label>
          <label className="InfoLabel">
            {'Status: '}
            {this.state.status}
          </label>
          <label className="InfoLabel">
            {'ID: '}
            {this.state.rid}
          </label>
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
              <GeneralButton text="Delete" handlePress={this.handleDeleteReview} />
            </Link>
            <GeneralButton text="Update" handlePress={this.handleUpdateReview} disabled={!this.state.changed} />
            <Link to="/viewReviews">
              <GeneralButton text="View All Reviews" />
            </Link>
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EditReview;
