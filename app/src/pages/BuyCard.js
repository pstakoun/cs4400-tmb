import React from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton.js';
import './Home.css';
import './BuyCard.css';


class BuyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: '',
      futureDateTime: '',
    };
  }

  calculateDateTimes(days) {
    const today = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const futureDate = `${future.getFullYear()}-${future.getMonth() + 1}-${future.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    this.setState({
      dateTime: `${date} ${time}`,
      futureDateTime: `${futureDate} ${time}`,
    });
  }

  handlePurchase(name, uses, daysRemaining) {
    if (daysRemaining != null) {
      this.calculateDateTimes(daysRemaining);
    }
    fetch('/api/cards/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        type: name,
        purchaseDateAndTime: this.state.dateTime,
        usesLeft: uses,
        expirationDate: this.state.futureDateTime,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        alert(`${name} purchased`);
      } else {
        alert(data.message);
      }
    });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Cards">
          <div className="ButtonWrapper">
            <header>
              <h3>Buy Trip Card</h3>
            </header>
            <b className="b">Pick Card Type:</b>
            <GeneralButton text="T-mes" handlePress={this.handlePurchase.bind(this, 'T-mes', null, 30)} />
            <GeneralButton text="T-10" handlePress={this.handlePurchase.bind(this, 'T-10', 10, null)} />
            <GeneralButton text="T-50/30" handlePress={this.handlePurchase.bind(this, 'T-50/30', 50, 30)} />
            <GeneralButton text="T-jove" handlePress={this.handlePurchase.bind(this, 'T-jove', null, 90)} />
          </div>
          <div className="ButtonWrapper">
            <Link to="/">
              <GeneralButton text="Main Menu" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyCard;
