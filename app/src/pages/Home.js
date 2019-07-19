import React from 'react';
import AdminHome from './AdminHome';
import PassengerHome from './PassengerHome';
import './Home.css';

class Home extends React.Component {
  isAdmin() {
    return false; // TODO
  }

  render() {
    return (
      <div className="Home">
        { this.isAdmin() ? <AdminHome /> : <PassengerHome /> }
      </div>
    );
  }
}

export default Home;
