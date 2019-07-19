import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
import GeneralButton from '../components/GeneralButton';
import TextField from '../components/TextField';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.userIDChange = this.userIDChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    this.state = {
      userID: '',
      password: '',
      loggedIn: false,
    };
  }

  handleLogin() {
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: this.state.userID,
        password: this.state.password,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        this.setState({
          loggedIn: true,
        });
      } else {
        alert(data.message);
      }
    });
  }

  userIDChange(event) {
    this.setState({ userID: event.target.value });
  }

  passwordChange(event) {
    this.setState({ password: event.target.value });
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
          { this.state.loggedIn ? <Redirect to="/" /> : null }
        </div>
      </div>
    );
  }
}

export default Login;
