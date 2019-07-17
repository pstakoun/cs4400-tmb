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
  }

  handleLogin() {
    console.log("Login Pressed")
  }

  handleRegister() {
    console.log("Register Pressed")
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Login">
          <TextField text="ID" type="text" />
          <TextField text="Password" type="password" />
          <div className="ButtonWrapper">
            <Link to={'/register'}>
              <GeneralButton text="Register" handlePress={this.handleRegister}/>
            </Link>
            <GeneralButton text="Login" handlePress={this.handleLogin}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
