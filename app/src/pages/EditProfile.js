import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import TextField from '../components/TextField';

class EditProfile extends React.Component {
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
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);

    this.fNameChange = this.fNameChange.bind(this);
    this.MIChange = this.MIChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.userIDChange = this.userIDChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordConfirmChange = this.passwordConfirmChange.bind(this);
  }

  componentWillMount() {
    fetch('/api/me').then(
      results => results.json(),
    ).then((data) => {
      console.log(data);
      this.setState({
        firstName: data.first_name,
      middleInitial: data.minit,
      lastName: data.last_name,
  email: data.passenger_email,
      userID: data.ID,
      password: data.password,
      passwordConfirm: data.password,
      });
    });
  }

  handleEditUser() {
    fetch('/api/users', {
      method: 'PUT',
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
      if(data.success) {
        alert('updated.');
      } else {
        alert(data.message);
      }
    });
  }
/*
  handleUpdateReview() {
    fetch('/api/reviews/' + this.state.rid, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        station: this.state.station,
        shopping: this.state.shoppingRating,
        speed: this.state.speedRating,
        comment: this.state.comment,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        alert('You updated this review');
      } else {
        alert(data.message);
      }
    });
  }*/

  handleDeleteUser() {
    fetch('/api/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        alert('You deleted this user. Please log back in.');
      } else {
        alert(data.message);
      }
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
          <TextField text="First Name *" type="text" value={this.state.firstName} handleChange={this.fNameChange} />
          <TextField text="Middle Initial" type="text" value={this.state.middleInitial} handleChange={this.MIChange} />
          <TextField text="Last Name *" type="text" value = {this.state.lastName} handleChange={this.lNameChange} />
          <TextField text="Email *" type="text"value={this.state.passenger_email} handleChange={this.emailChange} />
          <TextField text="User ID (unique) *" value ={this.state.userID} type="text" handleChange={this.userIDChange} />
          <TextField text="Password *" type="password" value ={this.state.password} handleChange={this.passwordChange} />
          <TextField text="Password again *" type="password" value ={this.state.passwordConfirm} handleChange={this.passwordConfirmChange} onChange={this.checkPass()} />
          <div className="ButtonWrapper">
            <h6>&apos;* is required&apos;</h6>
          </div>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
            <Link to="/login">
              <GeneralButton text="Delete User" handlePress={this.handleDeleteUser} />
            </Link>
              <GeneralButton text="Edit User" handlePress={this.handleEditUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;

