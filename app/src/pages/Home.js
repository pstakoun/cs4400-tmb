import React from 'react';
import PassengerHome from './PassengerHome';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <PassengerHome />
      
    </div>
  );
}

export default Home;

/*<Route exact path="/passHome" component={PassengerHome} />
        <Route exact path="/adminHome" component={AdminHome} />
      */  