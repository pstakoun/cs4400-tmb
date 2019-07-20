import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import GeneralButton from '../components/GeneralButton';
import './ViewReviews.css';
import '../components/Material-Icons.css';

class PendingReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentWillMount() {
    fetch('/api/reviews/pending').then(
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
                  render: rowData => (
                    <Link to={{
                      pathname: '/editReview',
                      state: {
                        rid: rowData.rid,
                      },
                    }}
                    >
                      {rowData.rid}
                    </Link>
                  ),
                },
                {
                  title: 'Station',
                  field: 'station_name',
                  render: rowData => (
                    <Link to={{
                      pathname: '/stationInfo',
                      state: {
                        rid: rowData.rid,
                      },
                    }}
                    >
                      {rowData.station_name}
                    </Link>
                  ),
                },
                {
                  title: 'Shopping',
                  field: 'shopping',
                },
                {
                  title: 'Connection Speed',
                  field: 'connection_speed',
                },
                {
                  title: 'Comment',
                  field: 'comment',
                },
              ]}
              data={this.state.reviews}
              title="Pending Reviews"
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

export default PendingReviews;
