import React from 'react';
import './Login.css';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';

function Login() {
  return (
    <div className="Wrapper">
      <div className="Login">
        <TextField text="ID" type="text" />
        <TextField text="Password" type="password" />
        <div className="ButtonWrapper">
          <GeneralButton text="Register" />
          <GeneralButton text="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
