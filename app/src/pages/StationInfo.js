import React from 'react';
import './StationInfo.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';
import '../components/Material-Icons.css';
import MaterialTable from 'material-table';
import ReviewStars from '../components/ReviewStars';

class StationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.stationName,
      status: '',
      stateProvince: '',
      address: '',
      zipcode: '',
      city: '',
      lines: [],
      reviews: [],
    };
  }

  componentWillMount() {
    fetch('/api/stations/' + this.state.name).then(
      results => results.json(),
    ).then((data) => {
      const station = data.station;
      this.setState({
        status: station.status,
        stateProvince: station.state_province,
        address: station.address,
        zipcode: station.zipcode,
        city: station.city,
        avgShoppingRating: 0,
        avgSpeedRating: 0,
      });
    });

    let initialLines = [];
    fetch(`/api/stations/${this.state.name}/lines`).then(
      results => results.json(),
    ).then((data) => {
      initialLines = data.lines.map(lines => lines.line_name);
      this.setState({
        lines: initialLines
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

  render() {
    const lines = this.state.lines.map(function(line){
      return <Link key={line} className={"lineLink"} to={{
        pathname: '/lineSummary',
        state: {
          line: line,
        }
      }}>
        {line}
      </Link>;
    });
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
          <label className="InfoLabel">
            {"Lines: "}
            {lines}
          </label>
          <ReviewStars text="Average Shopping" interactive={false} rating={this.state.avgShoppingRating}/>
          <ReviewStars text="Average Connection Speed" interactive={false} rating={this.state.avgSpeedRating}/>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'ID',
                  field: 'rid',
                },
                { title: 'Station',
                  field: 'station_name',
                },
                { title: 'Shopping',
                  field: 'shopping'
                },
                { title: 'Connection Speed',
                  field: 'connection_speed'
                },
                { title: 'Comment',
                  field: 'comment'
                },
              ]}
              data={this.state.reviews}
              title="Station Reviews"
            />
          </div>
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
