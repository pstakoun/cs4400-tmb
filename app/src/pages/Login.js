import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.userIDChange = this.userIDChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    this.state = {
      UserID: '',
      Password: '',
    };
  }

  handleLogin() {
    console.log('Login Pressed');
  }

  handleRegister() {
    console.log('Register Pressed');
  }

  userIDChange(event) {
    this.setState({ UserID: event.target.value });
  }

  passwordChange(event) {
    this.setState({ Password: event.target.value });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Login">
          <TextField text="ID" type="text" handleChange={this.userIDChange} />
          <TextField text="Password" type="password" handleChange={this.passwordChange} />
          <div className="ButtonWrapper">
            <Link to="/register">
              <GeneralButton text="Register" />
            </Link>
            <GeneralButton text="Login" handlePress={this.handleLogin} />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
