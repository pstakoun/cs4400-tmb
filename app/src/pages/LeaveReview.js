import React from 'react';
import './LeaveReview.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';
import ReviewStars from '../components/ReviewStars.js';
import 'react-dropdown/style.css';
import { stat } from 'fs';

class LeaveReview extends React.Component {
  constructor(props) {
    super(props);
    this.handleRateShopping = this.handleRateShopping.bind(this);
    this.handleRateSpeed = this.handleRateSpeed.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this._onSelect = this._onSelect.bind(this)
    this.state = {
      options: [],
      selected: '',
      shoppingRating: 0,
      speedRating: 0,
      comment: '',
      status: 'pending',
    };
  }

  
  handleLogin() {
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: this.state.userID,
        password: this.state.password,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        this.setState({
          loggedIn: true,
        });
      } else {
        alert(data.message);
      }
    });
  }


  componentWillMount() {
    let initialStations = [];
    fetch('/api/stations').then(
      results => results.json()
      ).then(data => {
        initialStations = data.map(station => station.name);
    this.setState({
      options: initialStations,
    });
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


  handleDropdownUpdate(value) {
    this.setState({currentOptions: value})
  }


  handleNewReview() {
    fetch('/api/reviews/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    station : this.state.selected,
    shopping : this.state.shoppingRating,
    connection : this.state.speedRating,
    comment : this.state.comment,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        //TODO idk wht goes here
      } else {
        alert(data.message);
      }
    });
  }

  _onSelect (option) {
    //console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  render() {
    const defaultOption = this.state.selected

    return (
      <div className="Wrapper">
        <div className="LeaveReview">
          <Dropdown
            options={(this.state.options)}
            value={defaultOption}
            onChange={this._onSelect}
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
            <GeneralButton text="Submit Review" handlePress={this.handleNewReview}/>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaveReview;
