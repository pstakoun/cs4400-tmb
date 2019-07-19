import React from 'react';
import Card from 'react';
import './GeneralButton.css';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }


  render() {
    return (
      <Card>
        <Card.Body>This is some text within a card body.</Card.Body>
      </Card>
    );
  }
}

export default MenuItem;
