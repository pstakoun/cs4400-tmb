import React from 'react';
import './StationInfo.css';
import './StationInfoAdmin.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';
import '../components/Material-Icons.css';
import MaterialTable from 'material-table';
import ReviewStars from '../components/ReviewStars';
import Dropdown from "react-dropdown";

class StationInfoAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectStatus = this.onSelectStatus.bind(this);

    this.state = {
      name: this.props.location.state.stationName,
      status: '',
      stateProvince: '',
      address: '',
      zipcode: '',
      city: '',
      lines: [],
      reviews: [],
      selected: '',
    };
  }

  componentWillMount() {
    fetch(`/api/stations/${this.state.name}`).then(
      results => results.json(),
    ).then((data) => {
      const { station } = data;
      this.setState({
        status: station.status,
        stateProvince: station.state_province,
        address: station.address,
        zipcode: station.zipcode,
        city: station.city,
        avgShoppingRating: 0,
        avgSpeedRating: 0,
        selected: station.status,
      });
    });

    let initialLines = [];
    fetch(`/api/stations/${this.state.name}/lines`).then(
      results => results.json(),
    ).then((data) => {
      initialLines = data.lines.map(lines => lines.line_name);
      this.setState({
        lines: initialLines,
      });
    });

    fetch(`/api/stations/${this.state.name}/reviews`).then(
      results => results.json(),
    ).then((data) => {
      this.setState({
        reviews: data.reviews,
      });
    });

    fetch(`/api/stations/${this.state.name}/ratings`).then(
      results => results.json(),
    ).then((data) => {
      this.setState({
        avgShoppingRating: data.ratings.avgShopping,
        avgSpeedRating: data.ratings.avgSpeed,
      });
    });
  }

  handleUpdateStatus(option) {
    console.log(option);
    fetch(`/api/stations/${this.state.name}/${option}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then(res => res.json()).then((data) => {
      alert(data.message);
    });
    this.setState({ state: option});
  }

  onSelectStatus(option) {
    this.setState({ selected: option});
    this.handleUpdateStatus(option.value);
  }

  render() {
    const lines = this.state.lines.map(line => (
      <Link
        key={line}
        className="lineLink"
        to={{
          pathname: '/lineSummary',
          state: {
            line,
          },
        }}
      >
        {line}
      </Link>
    ));
    const defaultStationOption = this.state.selected;
    return (
      <div className="Wrapper">
        <div className="StationInfo">
          <label className="InfoLabel">
            {'Station: '}
            {this.state.name}
          </label>
          <label className="InfoLabel">
            <div className={'textWrapper'}>
              {'Status: '}
              <Dropdown
                options={['Open', 'Half Capacity', 'Closed']}
                value={defaultStationOption}
                onChange={this.onSelectStatus}
              />
            </div>
          </label>
          <label className="InfoLabel">
            {'Address: '}
            {`${this.state.address}, ${this.state.zipcode} ${this.state.city}`}
          </label>
          <label className="InfoLabel">
            {'Lines: '}
            {lines}
          </label>
          <ReviewStars text="Average Shopping" interactive={false} rating={this.state.avgShoppingRating} />
          <ReviewStars text="Average Connection Speed" interactive={false} rating={this.state.avgSpeedRating} />
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'ID',
                  field: 'rid',
                },
                {
                  title: 'Station',
                  field: 'station_name',
                },
                {
                  title: 'Shopping',
                  field: 'shopping',
                },
                {
                  title: 'Connection Speed',
                  field: 'connection_speed',
                },
                {
                  title: 'Comment',
                  field: 'comment',
                },
              ]}
              data={this.state.reviews}
              title="Station Reviews"
            />
          </div>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default StationInfoAdmin;
