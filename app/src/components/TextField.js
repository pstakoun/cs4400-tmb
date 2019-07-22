import React from 'react';
import './TextField.css';

class TextField extends React.Component {
  render() {
    return (
      <div className="TextField">
        <label>{this.props.text}</label>
        <input
          type={this.props.type}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default TextField;
