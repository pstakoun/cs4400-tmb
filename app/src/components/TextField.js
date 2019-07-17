import React from 'react';
import './TextField.css';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      content: '',
    };
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <div className="TextField">
        <label>{this.props.text}</label>
        <input
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.state.content}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TextField;
