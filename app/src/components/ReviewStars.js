import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import './ReviewStars.css';

class ReviewStars extends React.Component {
  render() {
    return (
      <div className="ReviewStars">
        <label>{this.props.text}</label>
        <Rater
          total={5}
          interactive={this.props.interactive}
          rating={this.props.rating}
          onRate={({ rating }) => {
            this.props.handleRate(rating);
          }}
        />
      </div>
    );
  }
}

export default ReviewStars;
