import React from 'react';
import './LineSummary.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import 'react-dropdown/style.css';
import '../components/Material-Icons.css';
import MaterialTable from 'material-table';

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
    fetch('/api/stations/stationLines/' + this.state.name).then(
      results => results.json(),
    ).then((data) => {
      this.setState({
        stations: data.stations,
      });
    });
  }

  render() {
    const lines = this.state.lines.map(function(line){
      return <Link class={"lineLink"} to={{
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
        <div className="LineSummary">
          <label className="InfoLabel">
            {"Line: "}
            {this.state.name}
          </label>
          <label className="InfoLabel">
            {"Stops: "}
            {this.state.stops}
          </label>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'Station',
                  field: 'station_name',
                  render: rowData =>
                    <Link to={{
                      pathname: '/stationInfo',
                      state: {
                        rid: rowData.station_name
                      }
                    }}>
                      {rowData.station_name}
                    </Link>
                },
                {
                  title: 'Order',
                  field: 'order_number',
                },
              ]}
              data={this.state.stations}
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

export default LineSummary;
