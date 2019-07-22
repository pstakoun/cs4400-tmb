import React from 'react';
import './Register.css';
import { Link, Redirect } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import TextField from '../components/TextField';




class EditAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.user.first_name,
      middleInitial: props.user.minit,
      lastName: props.user.last_name,
      userID: props.user.ID,
      password: props.user.password,
      passwordConfirm: props.user.password,
      edited: false,
    };
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);

    this.fNameChange = this.fNameChange.bind(this);
    this.MIChange = this.MIChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.userIDChange = this.userIDChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordConfirmChange = this.passwordConfirmChange.bind(this);
  }

  handleEditUser() {
    fetch('/api/users/admin', {
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
      if (data.success) {
        alert('User updated.');
        this.setState({
          edited: true,
        });
      } else {
        alert(data.message);
      }
    });
  }


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
        alert('User deleted. Please log back in.');
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

  userIDChange(event) {
    this.setState({ userID: event.target.value });
  }

  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  passwordConfirmChange(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Register">
          <TextField text="First Name *" type="text" value={this.state.firstName} handleChange={this.fNameChange} />
          <TextField text="Middle Initial" type="text" value={this.state.middleInitial} handleChange={this.MIChange} />
          <TextField text="Last Name *" type="text" value={this.state.lastName} handleChange={this.lNameChange} />
          <TextField text="User ID (unique) *" type="text" value={this.state.userID} handleChange={this.userIDChange} />
          <TextField text="Password *" type="text" value={this.state.password} handleChange={this.passwordChange} />
          <TextField text="Password again *" type="text" value={this.state.passwordConfirm} handleChange={this.passwordConfirmChange} />
          <div className="ButtonWrapper">
            <h6>&apos;* is required&apos;</h6>
          </div>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
            <Link to="/login">
              <GeneralButton text="Delete" handlePress={this.handleDeleteUser} />
            </Link>
            <GeneralButton text="Update" handlePress={this.handleEditUser} />
            { /* this.state.edited ? <Redirect to="/" /> : null */ }
          </div>
        </div>
      </div>
    );
  }
}

export default EditAdmin;
