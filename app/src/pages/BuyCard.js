import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton.js';
import './Home.css';
import './BuyCard.css';


class BuyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchased: false,
    };
  }

  handlePurchase(type) {
    fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        this.setState({
          purchased: true,
        });
      }
      alert(data.message);
    });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Cards">
          <div className="ButtonWrapper">
            <header>
              <h3>Buy Card</h3>
            </header>
            <b className="b">Card Type:</b>
            <GeneralButton text="T-mes" handlePress={this.handlePurchase.bind(this, 'T-mes')} />
            <GeneralButton text="T-10" handlePress={this.handlePurchase.bind(this, 'T-10')} />
            <GeneralButton text="T-50/30" handlePress={this.handlePurchase.bind(this, 'T-50/30')} />
            <GeneralButton text="T-jove" handlePress={this.handlePurchase.bind(this, 'T-jove')} />
            { this.state.purchased ? <Redirect to="/" /> : null }
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
