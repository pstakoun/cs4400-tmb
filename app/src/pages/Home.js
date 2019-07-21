import React from 'react';
import AdminHome from './AdminHome';
import PassengerHome from './PassengerHome';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        { this.props.user.admin
          ? <AdminHome user={this.props.user} />
          : <PassengerHome user={this.props.user} />
        }
      </div>
    );
  }
}

export default Home;
