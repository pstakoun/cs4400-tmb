import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';
import './LineSummary.css';
import '../components/Material-Icons.css';

class LineSummaryAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.line,
      stops: '',
      stations: [],
    };
  }

  componentWillMount() {
    fetch(`/api/lines/${this.state.name}/stations`).then(
      results => results.json(),
    ).then((data) => {
      this.setState({
        stations: data.stations,
        stops: data.stations.length,
      });
    });
  }

  handleChangeOrder(orderNumber, increment) {
    const target = orderNumber + increment;
    if (target < 1) {
      alert('Order number must be positive');
      return;
    }
    let initialIndex = -1;
    let swapIndex = -1;
    const { stations } = this.state;
    for (let i = 0; i < stations.length; i++) {
      if (stations[i].order_number === orderNumber) {
        initialIndex = i;
      }
      if (stations[i].order_number === target) {
        swapIndex = i;
      }
    }
    if (initialIndex === -1) {
      return;
    }
    stations[initialIndex].order_number = target;
    fetch('/api/lines/order', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderNumber: target,
        line: this.state.name,
        station: stations[initialIndex].station_name,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.message) {
        alert(data.message);
      }
    });
    if (swapIndex !== -1) {
      stations[swapIndex].order_number = orderNumber;
      fetch('/api/lines/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber,
          line: this.state.name,
          station: stations[swapIndex].station_name,
        }),
      }).then(res => res.json()).then((data) => {
        if (data.message) {
          alert(data.message);
        }
      });
    }
    this.setState({
      stations,
    });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="LineSummary">
          <label className="InfoLabel">
            {'Line: '}
            {this.state.name}
          </label>
          <label className="InfoLabel">
            {'Stops: '}
            {this.state.stops}
          </label>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'Station',
                  field: 'station_name',
                  render: rowData => (
                    <Link to={{
                      pathname: '/stationInfo',
                      state: {
                        stationName: rowData.station_name,
                      },
                    }}
                    >
                      {rowData.station_name}
                    </Link>
                  ),
                },
                {
                  title: 'Order',
                  field: 'order_number',
                  defaultSort: 'asc',
                },
              ]}
              data={this.state.stations}
              actions={[
                {
                  icon: 'keyboard_arrow_up',
                  tooltip: 'Change Order',
                  onClick: (event, rowData) => this.handleChangeOrder(rowData.order_number, -1),
                },
                {
                  icon: 'keyboard_arrow_down',
                  tooltip: 'Change Order',
                  onClick: (event, rowData) => this.handleChangeOrder(rowData.order_number, 1),
                },
              ]}
              options={{
                sorting: true,
              }}
              title="Line Summary"
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

export default LineSummaryAdmin;
