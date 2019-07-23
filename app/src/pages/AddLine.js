import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import Dropdown from 'react-dropdown';
import GeneralButton from '../components/GeneralButton';
import TextField from '../components/TextField';
import 'react-dropdown/style.css';
import './AdminGeneral.css';
import './Register.css';
import './AddStation.css';
import '../components/Material-Icons.css';

class AddLine extends React.Component {
  constructor(props) {
    super(props);

    this.lineNameChange = this.lineNameChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.orderFieldChange = this.orderFieldChange.bind(this);
    this.handleAddLine = this.handleAddLine.bind(this);
    this.handleAddStation = this.handleAddStation.bind(this);

    this.state = {
      lineName: '',
      stations: [],
      selected: null,
      addedStations: [],
      orderField: '',
    };
  }

  componentWillMount() {
    let initialStations = [];
    fetch('/api/stations/')
      .then(res => res.json()).then((data) => {
        if (!data.stations) {
          return;
        }
        initialStations = data.stations.map(station => station.name);
        this.setState({
          stations: initialStations,
        });
      });
  }

  handleAddLine() {
    fetch('/api/lines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.lineName,
        newStations: this.state.addedStations,
      }),
    }).then(res => res.json()).then((data) => {
      alert(data.message);
      if (data.success) {
        window.location.reload();
      }
    });
  }


  handleAddStation() {
    if (this.state.selected == null) {
      alert('Please select a station');
    } else {
      const name = this.state.selected.value;
      const orderNum = this.state.orderField;
      let updatedLines = this.state.addedStations;
      const newElement = {
        name,
        order_num: orderNum,
      };
      if (orderNum == null || orderNum.length < 1) {
        alert('Please enter in an order number');
      } else if (this.state.addedStations.some(station => (station.name === name))) {
        alert('A station can only be in a line once');
      } else if (this.state.addedStations.some(station => (station.order_num === orderNum))) {
        alert('A station already exists at this order number');
      } else {
        if (updatedLines != null) {
          updatedLines.push(newElement);
        } else {
          updatedLines = [newElement];
        }
        this.setState({
          addedStations: updatedLines,
        });
      }
    }
  }

  lineNameChange(event) {
    this.setState({ lineName: event.target.value });
  }

  orderFieldChange(event) {
    this.setState({ orderField: event.target.value });
  }

  onSelect(option) {
    this.setState({ selected: option });
  }

  render() {
    const defaultOption = this.state.selected;
    return (
      <div className="Wrapper">
        <div className="ContentWrapper, Register">
          <TextField text="Line Name (Unique) *" type="text" handleChange={this.lineNameChange} />
          <Dropdown
            options={(this.state.stations)}
            value={defaultOption}
            onChange={this.onSelect}
            placeholder="Select a Station"
          />
          <div className="newLineWrapper">
            <TextField placeholder="Order" text={null} handleChange={this.orderFieldChange} />
            <GeneralButton text="Add Station" handlePress={this.handleAddStation} />
          </div>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'Station',
                  field: 'name',
                },
                {
                  title: 'Order',
                  field: 'order_num',
                  defaultSort: 'asc',
                },
              ]}
              data={this.state.addedStations}
              options={{
                sorting: false,
                search: false,
              }}
              title="Stations Added to Line"
            />
          </div>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
            <GeneralButton text="Add Line" handlePress={this.handleAddLine} />
          </div>
        </div>
      </div>
    );
  }
}

export default AddLine;
