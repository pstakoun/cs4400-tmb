import React from 'react';
import './Register.css';
import GeneralButton from '../components/GeneralButton.js';
import TextField from '../components/TextField.js';

function Login() {
  return (
    <div className="Wrapper">
      <div className="Register">
        <TextField text="ID" type="text" />
        <TextField text="ID" type="text" />
        <TextField text="ID" type="text" />
        <TextField text="ID" type="text" />
        <TextField text="ID" type="text" />
        <TextField text="ID" type="text" />
        <TextField text="Password" type="password" />
        <TextField text="Password (again)" type="password" />
        <div className="ButtonWrapper">
          <GeneralButton text="Register" />
          <GeneralButton text="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
