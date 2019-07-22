import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import Dropdown from 'react-dropdown';
import GeneralButton from '../components/GeneralButton';
import TextField from '../components/TextField';
import './AdminGeneral.css';
import '../components/Material-Icons.css';
import 'react-dropdown/style.css';
import './Register.css';
import './AddStation.css';

class AddStation extends React.Component {
  constructor(props) {
    super(props);

    this.stationNameChange = this.stationNameChange.bind(this);
    this.streetAddressChange = this.streetAddressChange.bind(this);
    this.cityChange = this.cityChange.bind(this);
    this.stateProvinceChange = this.stateProvinceChange.bind(this);
    this.zipCodeChange = this.zipCodeChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.orderFieldChange = this.orderFieldChange.bind(this);
    this.handleAddLine = this.handleAddLine.bind(this);

    this.state = {
      stationName: '',
      streetAddress: '',
      city: '',
      stateProvince: '',
      zipCode: '',
      lines: [],
      selected: '',
      addedLines: [],
      orderField: '',
    };
  }

  componentWillMount() {
    let initialLines = [];
    fetch('/api/lines/')
      .then(res => res.json()).then((data) => {
        if (!data.lines) {
          return;
        }
        initialLines = data.lines.map(lines => lines.name);
        this.setState({
          lines: initialLines,
        });
      });
  }

  handleAddStation() {
    // TODO add a station
  }

  handleAddLine() {
    const name = this.state.selected.value;
    const orderNum = this.state.orderField;
    let updatedLines = this.state.addedLines;
    const newElement = { name, order_num: orderNum };
    if (updatedLines != null) {
      updatedLines.push(newElement);
    } else {
      updatedLines = [newElement];
    }
    this.setState({
      addedLines: updatedLines,
    });
  }

  stationNameChange(event) {
    this.setState({ stationName: event.target.value });
  }

  streetAddressChange(event) {
    this.setState({ streetAddress: event.target.value });
  }

  cityChange(event) {
    this.setState({ city: event.target.value });
  }

  stateProvinceChange(event) {
    this.setState({ stateProvince: event.target.value });
  }

  zipCodeChange(event) {
    this.setState({ zipCode: event.target.value });
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
          <TextField text="Station Name (Unique) *" type="text" handleChange={this.fNameChange} />
          <TextField text="Street Address *" type="text" handleChange={this.MIChange} />
          <TextField text="City *" type="text" handleChange={this.lNameChange} />
          <TextField text="State/Province *" type="text" handleChange={this.emailChange} />
          <TextField text="Zip Code *" type="text" handleChange={this.userIDChange} />
          <Dropdown
            options={(this.state.lines)}
            value={defaultOption}
            onChange={this.onSelect}
            placeholder="Select a Line"
          />
          <div className="newLineWrapper">
            <TextField placeholder="Order" text={null} handleChange={this.orderFieldChange} />
            <GeneralButton text="Add Line" handlePress={this.handleAddLine} />
          </div>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'Line',
                  field: 'name',
                },
                {
                  title: 'Order',
                  field: 'order_num',
                },
              ]}
              data={this.state.addedLines}
              options={{
                sorting: true,
                search: false,
              }}
              title="Lines Added to Station"
            />
          </div>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
            <GeneralButton text="Add Station" handlePress={this.handleAddStation} />
          </div>
        </div>
      </div>
    );
  }
}

export default AddStation;
