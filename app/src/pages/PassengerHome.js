import React from 'react';
import GeneralButton from '../components/GeneralButton.js';
import './PassHome.css';


function PassengerHome() {

    return (
       
        <div className = "Wrapper">  
            
            <div className = "Cards">  
            <div className={"ButtonWrapper"}>
               
                <GeneralButton text = {"Leave Review"}/>
                <GeneralButton text = {"View Review"}/>
                <GeneralButton text = {"Buy Card"}/>
                <GeneralButton text = {"Go on Trip"}/>
                <GeneralButton text = {"View Trips"}/>
                <GeneralButton text = {"Edit"}/>

         </div>

         </div>
</div>
    );

export default PassengerHome;
