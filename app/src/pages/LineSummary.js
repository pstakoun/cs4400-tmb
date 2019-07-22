import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';
import './LineSummary.css';
import '../components/Material-Icons.css';

class LineSummary extends React.Component {
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
    console.log(this.state.stations);
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

export default LineSummary;
