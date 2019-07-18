import React from 'react';
import MaterialTable from 'material-table';

const column = ['ID', 'Station', 'Shopping', 'Connection Speed'];

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  idClicked() {
    console.log('id clicked');
  }

  stationClicked() {
    console.log('station sclicked');
  }

  render() {
    return (
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
    );
  }
}

export default Table;
