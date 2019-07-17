import React from 'react';
import GeneralButton from '../components/GeneralButton.js';
import { Link } from 'react-router-dom';
import './PassHome.css';


function PassengerHome() {

    return (
       
        <div className = "Wrapper">  
            
            <div className = "Cards"> 

                <div className={"ButtonWrapper"}>
               <header>
    <h2>Welcome Passenger!</h2>
  </header>

  <b className="b">Actions:</b>
d             <Link to={'/LeaveReview'}>
                <GeneralButton text = {"Leave Review"}/>
                </Link>
                <GeneralButton text = {"View Review"}/>
                <GeneralButton text = {"Buy Card"}/>
                <GeneralButton text = {"Go on Trip"}/>
                <GeneralButton text = {"View Trips"}/>
                <GeneralButton text = {"Edit"}/>
            </div>
         </div>
    </div>
    );
}

export default PassengerHome;
