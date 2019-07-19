import React from 'react';
import AdminHome from './AdminHome';
import PassengerHome from './PassengerHome';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
    };
  }

  componentWillMount() {
    fetch('/api/me')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          admin: data.admin,
        });
      });
  }

  render() {
    return (
      <div className="Home">
        { this.state.admin ? <AdminHome /> : <PassengerHome /> }
      </div>
    );
  }
}

export default Home;
