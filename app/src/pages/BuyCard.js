import React from 'react';
import GeneralButton from '../components/GeneralButton.js';
import './PassHome.css';


function BuyCard() {
  return (

    <div className="Wrapper">

      <div className="Cards">

        <div className="ButtonWrapper">
          <header>
            <h3>Buy Trip Card</h3>
          </header>

          <b className="b">Pick Card Type:</b>
          <GeneralButton text="T-mes" />
          <GeneralButton text="T-10" />
          <GeneralButton text="T-50/30" />
          <GeneralButton text="T-jove" />
        </div>
      </div>
    </div>
  );
}

export default BuyCard;
