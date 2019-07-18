import React from 'react';
import './ViewReviews.css';
import '../components/Material-Icons.css';
import { Link } from 'react-router-dom';
import Table from '../components/Table.js';
import GeneralButton from '../components/GeneralButton';



class ViewReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="ViewReviews">
          <Table/>
          <div className={"ButtonWrapper"}>
            <Link to={"/passengerHome"}>
              <GeneralButton text={"Main Menu"}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewReviews;
