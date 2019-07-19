import React from 'react';
import './StationInfo.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';

class StationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleRateShopping = this.handleRateShopping.bind(this);
    this.handleRateSpeed = this.handleRateSpeed.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.state = {
      name: this.props.location.state.rid,
      status: '',
      stateProvince: '',
      address: '',
      zipcode: '',
      city: '',
    };
  }

  componentWillMount() {
    fetch('/api/stations/' + this.state.name).then(
      results => results.json(),
    ).then((data) => {
      console.log(data);
      this.setState({
        status: data.stations[0].status,
        stateProvince: data.stations[0].state_province,
        address: data.stations[0].address,
        zipcode: data.stations[0].zipcode,
        city: data.stations[0].city,
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

  render() {
    return (
      <div className="Wrapper">
        <div className="StationInfo">
          <label className="InfoLabel">
            {"Station: "}
            {this.state.name}
          </label>
          <label className="InfoLabel">
            {"Status: "}
            {this.state.status}
          </label>
          <label className="InfoLabel">
            {"Address: "}
            {this.state.address + ', ' + this.state.zipcode + ' ' + this.state.city}
          </label>
          <textarea
            rows="5"
            placeholder="Comment here..."
            onChange={this.handleCommentChange}
            value={this.state.comment}
          />
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu"/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default StationInfo;
