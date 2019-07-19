import React from 'react';
import './ViewReviews.css';
import '../components/Material-Icons.css';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import GeneralButton from '../components/GeneralButton';


class ViewReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentWillMount() {
    fetch('/api/reviews').then(
      results => results.json(),
    ).then((data) => {
      console.log(data.reviews);
      this.setState({
        reviews: data.reviews,
      });
    });
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
                  field: 'rid',
                  render: rowData => <a href="FAKE ROUTING">{rowData.rid}</a>,
                },
                { title: 'Station', field: 'station_name', render: rowData => <a href="FAKE ROUTING">{rowData.station_name}</a> },
                { title: 'Shopping', field: 'shopping' },
                { title: 'Connection Speed', field: 'connection_speed' },
              ]}
              data={this.state.reviews}
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
