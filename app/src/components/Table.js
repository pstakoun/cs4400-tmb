import React from 'react';
import MaterialTable from 'material-table';

const column = ['ID', 'Station', 'Shopping', 'Connection Speed'];

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'ID', field: 'name' },
            { title: 'Station', field: 'surname' },
            { title: 'Shopping', field: 'birthYear', type: 'numeric' },
            { title: 'Connection Speed', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
          ]}
          data={[
            {
              name: 'Matt', surname: 'Carroll', birthYear: 1999, birthCity: 34,
            },
            {
              name: 'Carolyn', surname: 'Carroll', birthYear: 1963, birthCity: 63,
            },
          ]}
          title="My Reviews"
        />
      </div>
    );
  }
}

export default Table;
