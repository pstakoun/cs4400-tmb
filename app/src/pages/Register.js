import React from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import TextField from '../components/TextField';
import './Register.css';

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
      passwordAgreement: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.fNameChange = this.fNameChange.bind(this);
    this.MIChange = this.MIChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.userIDChange = this.userIDChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordConfirmChange = this.passwordConfirmChange.bind(this);
    this.passwordAgreementChange = this.passwordAgreementChange.bind(this);
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

  passwordAgreementChange(event) {
    this.setState({ passwordAgreement: event.target.checked });
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
          <div className="checkbox">
            <br />
            <label>I want to store my password in plaintext and have it shown to me every time I edit my profile *</label>
            <br />
            <div className="checkboxContainer">
              <input
                type="checkbox"
                checked={this.state.passwordAgreement}
                onClick={this.passwordAgreementChange}
              />
            </div>
          </div>
          <div className="ButtonWrapper">
            <h6>&apos;* is required&apos;</h6>
          </div>
          <div className="ButtonWrapper">
            <Link to="/login">
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
