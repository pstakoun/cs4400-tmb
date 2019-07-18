import React from 'react';
import './ViewReviews.css';
import '../components/Material-Icons.css';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import MaterialTable from 'material-table';


class ViewReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="ViewReviews">
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'ID',
                  field: 'userID',
                  render: rowData => <a href="FAKE ROUTING">{rowData.userID}</a>,
                },
                { title: 'Station', field: 'stationName', render: rowData => <a href="FAKE ROUTING">{rowData.stationName}</a> },
                { title: 'Shopping', field: 'shoppingRate' },
                { title: 'Connection Speed', field: 'speedRate' },
              ]}
              data={[
                {
                  userID: '1', stationName: 'Catalunya', shoppingRate: 3, speedRate: 2,
                },
                {
                  userID: '2', stationName: 'Espanya', shoppingRate: 3, speedRate: 4,
                },
              ]}
              title="My Reviews"
            />
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

export default ViewReviews;
