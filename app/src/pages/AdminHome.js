import React from 'react';
import GeneralButton from '../components/GeneralButton.js';
import './PassHome.css';


function PassengerHome() {

    return (
       
        <div className = "Wrapper">  
            
            <div className = "Cards"> 

                <div className={"ButtonWrapper"}>
               <header>
    <h2>Welcome Admin!</h2>
  </header>

  <b className="b">Actions:</b>
  <GeneralButton text = {"View Trips"}/>

               
                <GeneralButton text = {"Buy Card"}/>
                <GeneralButton text = {"Go on Trip"}/>
                <GeneralButton text = {"Edit Profile"}/>
                <GeneralButton text = {"Add Station"}/>
                <GeneralButton text = {"Add Line"}/>
                <GeneralButton text = {"Review Passenger Reviews"}/>
            </div>
         </div>
    </div>
    );
}

export default PassengerHome;
