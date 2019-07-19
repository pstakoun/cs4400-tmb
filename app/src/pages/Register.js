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
      passwordConfirm: '',
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.fNameChange = this.fNameChange.bind(this);
    this.MIChange = this.MIChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.userIDChange = this.userIDChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordConfirmChange = this.passwordConfirmChange.bind(this);
  }

  handleRegister() {
    fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        middleInitial: this.state.middleInitial,
        lastName: this.state.lastName,
        email: this.state.email,
        userID: this.state.userID,
        password: this.state.password,
        confirmPassword: this.state.passwordConfirm,
      }),
    }).then(res => res.json()).then((data) => {
      alert(data.message);
    });
  }

  fNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  MIChange(event) {
    this.setState({ middleInitial: event.target.value });
  }

  lNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  userIDChange(event) {
    this.setState({ userID: event.target.value });
  }

  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  passwordConfirmChange(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  checkPass() {
    console.log(`${this.state.password} | ${this.state.passwordConfirm}`);
    if (this.state.password === this.state.passwordConfirm) {
      console.log('Passwords match');
    } else {
      console.log('Passwords do not match');
    }
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Register">
          <TextField text="First Name *" type="text" handleChange={this.fNameChange} />
          <TextField text="Middle Initial" type="text" handleChange={this.MIChange} />
          <TextField text="Last Name *" type="text" handleChange={this.lNameChange} />
          <TextField text="Email *" type="text" handleChange={this.emailChange} />
          <TextField text="User ID (unique) *" type="text" handleChange={this.userIDChange} />
          <TextField text="Password *" type="password" handleChange={this.passwordChange} />
          <TextField text="Password again *" type="password" handleChange={this.passwordConfirmChange} onChange={this.checkPass()} />
          <div className="ButtonWrapper">
            <h6>'* is required'</h6>
          </div>
          <div className="ButtonWrapper">
            <Link to="/login">
              <GeneralButton text="I already have an account" />
            </Link>
            <Link to="/login">
              <GeneralButton text="Register" handlePress={this.handleRegister} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
