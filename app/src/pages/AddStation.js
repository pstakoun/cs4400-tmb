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
    this.handleAddStation = this.handleAddStation.bind(this);

    this.state = {
      stationName: '',
      streetAddress: '',
      city: '',
      stateProvince: '',
      zipCode: '',
      lines: [],
      selected: null,
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
    console.log(this.state.addedLines);
    fetch('/api/stations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.stationName,
        address: this.state.streetAddress,
        city: this.state.city,
        stateProvince: this.state.stateProvince,
        zipcode: this.state.zipcode,
        newLines: this.state.addedLines,
        //TODO figure out what status should be default
        status: 'Open',
      }),
    }).then(res => res.json()).then((data) => {
      if (!data.success) {
        alert(data.message);
      }
    });
  }


  handleAddLine() {
    if (this.state.selected == null) {
      alert('Please select a line');
    } else {
      const name = this.state.selected.value;
      const orderNum = this.state.orderField;
      let updatedLines = this.state.addedLines;
      const newElement = {
        name,
        order_num: orderNum
      };
      if (orderNum == null || orderNum.length < 1) {
        alert('Please enter in an order number');
      } else if (this.state.addedLines.some(line => (line.name === name))) {
        alert('A line can only be in a station once');
      } else {
        this.checkOrderNumber(newElement, result => {
          if (result) {
            alert('That order number already exists beyond this station');
          } else {
            if (updatedLines != null) {
              updatedLines.push(newElement);
            } else {
              updatedLines = [newElement];
            }
            this.setState({
              addedLines: updatedLines,
            });
          }
        });
      }
    }
  }

  checkOrderNumber(element, cb) {
    fetch(`/api/lines/${element.name}/${element.order_num}`).then(
      results => results.json(),
    ).then((data) => {
      if (data.matches[0].matched === 1) {
        console.log("wtf");
        return cb(true);
      }
      cb(false);
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
          <TextField text="Station Name (Unique) *" type="text" handleChange={this.stationNameChange} />
          <TextField text="Street Address *" type="text" handleChange={this.streetAddressChange} />
          <TextField text="City *" type="text" handleChange={this.cityChange} />
          <TextField text="State/Province *" type="text" handleChange={this.stateProvinceChange} />
          <TextField text="Zip Code *" type="text" handleChange={this.zipCodeChange} />
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
