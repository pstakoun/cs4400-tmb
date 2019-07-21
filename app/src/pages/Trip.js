import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';
import './Trip.css';

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      cards: [],
      fullCards: [],
      selectedStation: '',
      selectedCard: '',
      created: false,
    };
    this.onSelectStation = this.onSelectStation.bind(this);
    this.onSelectCard = this.onSelectCard.bind(this);
    this.handleTripGenerate = this.handleTripGenerate.bind(this);
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

    let initialCards = [];
    let initialFullCards = [];
    fetch('/api/cards').then(
      results => results.json(),
    ).then((data) => {
      initialCards = data.cards.map((card, i) => ({ value: i, label: `${card.type} (${card.purchase_date_time.slice(0, 19).replace('T', ' ')})` }));
      initialFullCards = data.cards.map(card => ({ type: card.type, purchaseDate: card.purchase_date_time }));
      this.setState({
        cards: initialCards,
        fullCards: initialFullCards,
      });
    });
  }

  handleTripGenerate() {
    fetch('/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: this.state.fullCards[this.state.selectedCard.value].type,
        purchaseDateTime: this.state.fullCards[this.state.selectedCard.value].purchaseDate,
        fromStation: this.state.selectedStation.value,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        this.setState({
          created: true,
        });
      }
      alert(data.message);
    });
  }

  onSelectStation(option) {
    this.setState({ selectedStation: option });
  }

  onSelectCard(option) {
    this.setState({ selectedCard: option });
  }

  render() {
    const defaultStationOption = this.state.selectedStation;
    const defaultCardOption = this.state.selectedCard;
    return (
      <div className="Wrapper">
        <div className="Trip">
          <label className="InfoLabel">
            Starting Station
          </label>
          <Dropdown
            options={(this.state.stations)}
            value={defaultStationOption}
            onChange={this.onSelectStation}
            placeholder="Select a Station"
          />
          <label className="InfoLabel">
            Card Used
          </label>
          <Dropdown
            options={(this.state.cards)}
            value={defaultCardOption}
            onChange={this.onSelectCard}
            placeholder="Select a Card"
          />
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
            <GeneralButton text="Embark" handlePress={this.handleTripGenerate} />
            { this.state.created ? <Redirect to="/" /> : null }
          </div>
        </div>
      </div>
    );
  }
}

export default Trip;
