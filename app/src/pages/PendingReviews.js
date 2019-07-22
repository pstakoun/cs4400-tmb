import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import GeneralButton from '../components/GeneralButton';
import './AdminGeneral.css';
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
      this.setState({
        reviews: data.reviews,
      });
    });
  }

  handleApproveReview(user_id, rid) {
    fetch(`/api/reviews/${rid}/${user_id}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        this.setState({
          reviews: this.state.reviews.filter(review => !(review.rid === rid && review.passenger_ID === user_id)),
        });
      }
      alert(data.message);
    });
  }

  handleRejectReview(user_id, rid) {
    fetch(`/api/reviews/${rid}/${user_id}/reject`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then((data) => {
      if (data.success) {
        this.setState({
          reviews: this.state.reviews.filter(review => !(review.rid === rid && review.passenger_ID === user_id)),
        });
      }
      alert(data.message);
    });
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="ContentWrapper">
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              columns={[
                {
                  title: 'User',
                  field: 'passenger_ID',
                },
                {
                  title: 'Station',
                  field: 'station_name',
                  render: rowData => (
                    <Link to={{
                      pathname: '/stationInfo',
                      state: {
                        stationName: rowData.station_name,
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
              actions={[
                {
                  icon: 'check',
                  tooltip: 'Approve Review',
                  onClick: (event, rowData) => this.handleApproveReview(rowData.passenger_ID, rowData.rid),
                },
                {
                  icon: 'close',
                  tooltip: 'Reject Review',
                  onClick: (event, rowData) => this.handleRejectReview(rowData.passenger_ID, rowData.rid),
                },
              ]}
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
