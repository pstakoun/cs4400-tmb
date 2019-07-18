import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';

class Register extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      FirstName: "",
      MiddleInitial: "",
      LastName: "",
      Email: "",
      UserID: "",
      Password: "",
      PasswordCheck: ""
    }
    this.fNameChange = this.fNameChange.bind(this);
    this.MIChange = this.MIChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.userIDChange = this.userIDChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordCheckChange = this.passwordCheckChange.bind(this);
  }

  fNameChange(event) {
    this.setState({ FirstName: event.target.value});
  }

  MIChange(event) {
    this.setState({ MiddleInitial: event.target.value});
  }

  lNameChange(event) {
    this.setState({ LastName: event.target.value});
  }

  emailChange(event) {
    this.setState({ Email: event.target.value});
  }

  userIDChange(event) {
    this.setState({ UserID: event.target.value});
  }

  passwordChange(event) {
    this.setState({ Password: event.target.value});
  }

  passwordCheckChange(event) {
    this.setState({ PasswordCheck: event.target.value});
  }

  checkPass() {
    console.log(this.state.Password + " | " + this.state.PasswordCheck)
    if (this.state.Password === this.state.PasswordCheck) {
      console.log("Passwords match");
    } else {
      console.log("Passwords do not match");
    }
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Register">
          <TextField text="First Name" type="text" handleChange={this.fNameChange}/>
          <TextField text="Middle Initial" type="text" handleChange={this.MIChange}/>
          <TextField text="Last Name" type="text" handleChange={this.lNameChange}/>
          <TextField text="Email" type="text" handleChange={this.emailChange}/>
          <TextField text="User ID (unique)" type="text"handleChange={this.userIDChange} />
          <TextField text="Password" type="password" handleChange={this.passwordChange}/>
          <TextField text="Password (again)" type="password" handleChange={this.passwordCheckChange} onChange={this.checkPass()}/>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="I already have an account" />
            </Link>
            <GeneralButton text="Register" />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
