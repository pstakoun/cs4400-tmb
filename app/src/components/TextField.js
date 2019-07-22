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
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.props.onEnter();
            }
          }}
        />
      </div>
    );
  }
}

export default TextField;
