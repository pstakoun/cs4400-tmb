import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleInitial: '',
      lastName: '',
      email: '',
      userID: '',
      password: '',
      confirmPassword: '',
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {

  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Register">
          <TextField text="First Name" type="text" />
          <TextField text="Middle Initial" type="text" />
          <TextField text="Last Name" type="text" />
          <TextField text="Email" type="text" />
          <TextField text="User ID (unique)" type="text" />
          <TextField text="Password" type="password" />
          <TextField text="Password (again)" type="password" />
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="I already have an account" />
            </Link>
            <GeneralButton text="Register" handlePress={this.handleRegister} />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
