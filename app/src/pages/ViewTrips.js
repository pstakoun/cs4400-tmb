import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';
import './ViewTrips.css';
import '../components/Material-Icons.css';

class ViewTrips extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdateTrip = this.handleUpdateTrip.bind(this);
    this.state = {
      trips: [],
      updateTripData: null,
    };
  }

  handleUpdateTrip(data) {
    this.setState({
      updateTripData: data,
    });
  }

  componentWillMount() {
    let initialTrips = [];
    fetch('/api/trips/').then(
      results => results.json(),
    ).then((data) => {
      initialTrips = data.trips.map(trip => ({
        card_type: trip.card_type,
        start_date_time: trip.start_date_time,
        start_date_time_display: trip.start_date_time.slice(0, 19).replace('T', ' '),
        end_date_time: trip.end_date_time,
        end_date_time_display: trip.end_date_time ? trip.end_date_time.slice(0, 19).replace('T', ' ') : null,
        from_station_name: trip.from_station_name,
        to_station_name: trip.to_station_name,
        card_purchase_date_time: trip.card_purchase_date_time,
        card_purchase_date_time_display: trip.card_purchase_date_time ? trip.card_purchase_date_time.slice(0, 19).replace('T', ' ') : null,
      }));
      this.setState({
        trips: initialTrips,
      });
    });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="ViewTrips">
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'Start Date Time',
                  field: 'start_date_time_display',
                },
                {
                  title: 'End Date Time',
                  field: 'end_date_time_display',
                },
                {
                  title: 'Card Used',
                  field: 'card_type',
                },
                {
                  title: 'From',
                  field: 'from_station_name',
                  render: rowData => (
                    <Link to={{
                      pathname: '/stationInfo',
                      state: {
                        stationName: rowData.from_station_name,
                      },
                    }}
                    >
                      {rowData.from_station_name}
                    </Link>
                  ),
                },
                {
                  title: 'To',
                  field: 'to_station_name',
                  render: rowData => (
                    <Link to={{
                      pathname: '/stationInfo',
                      state: {
                        stationName: rowData.to_station_name,
                      },
                    }}
                    >
                      {rowData.to_station_name}
                    </Link>
                  ),
                },
              ]}
              data={this.state.trips}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Update Trip',
                  onClick: (event, rowData) => this.handleUpdateTrip(rowData),
                },
              ]}
              title="My Trips"
            />
          </div>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
            { this.state.updateTripData
              ? (
                <Redirect to={{
                  pathname: '/updateTrip',
                  state: { trip: this.state.updateTripData },
                }}
                />
              )
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewTrips;
