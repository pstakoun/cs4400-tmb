import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';
import './Trip.css';

class UpdateTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      selectedStation: this.props.location.state.trip.to_station_name || '',
      updated: false,
    };
    this.onSelectStation = this.onSelectStation.bind(this);
    this.handleUpdateTrip = this.handleUpdateTrip.bind(this);
  }

  componentWillMount() {
    let initialStations = [];
    fetch('/api/stations').then(
      results => results.json(),
    ).then((data) => {
      initialStations = data.stations.map(stations => stations.name);
      this.setState({
        stations: initialStations,
      });
    });
  }

  handleUpdateTrip() {
    const { trip } = this.props.location.state;
    fetch('/api/trips', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toStation: this.state.selectedStation.value,
        cardType: trip.card_type,
        startDateTime: trip.start_date_time,
        purchaseDateTime: trip.card_purchase_date_time,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        this.setState({
          updated: true,
        });
      }
      alert(data.message);
    });
  }

  onSelectStation(option) {
    this.setState({ selectedStation: option });
  }

  render() {
    const { trip } = this.props.location.state;
    const defaultStationOption = this.state.selectedStation;
    return (
      <div className="Wrapper">
        <div className="Trip">
          <label className="InfoLabel">
            {`Starting Station: ${trip.from_station_name}`}
          </label>
          <label className="InfoLabel">
            End Station:
          </label>
          <Dropdown
            options={(this.state.stations)}
            value={defaultStationOption}
            onChange={this.onSelectStation}
            placeholder="Select a Station"
          />
          <label className="InfoLabel">
            {`Card Used: ${trip.card_type} (${trip.card_purchase_date_time_display})`}
          </label>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
            <GeneralButton text="Update" handlePress={this.handleUpdateTrip} />
            { !trip || this.state.updated ? <Redirect to="/viewTrips" /> : null }
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateTrip;
