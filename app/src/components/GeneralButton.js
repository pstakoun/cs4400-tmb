import React from 'react';
import './GeneralButton.css';

class GeneralButton extends React.Component {
  validateForm() {
    if (this.props.required) {
      return this.state.content.length > 0;
    }
    return true;
  }

  render() {
    return (
      <button
        className="GeneralButton"
        type="submit"
        onClick={this.props.handlePress}
        disabled={!this.validateForm()}
      >
        {this.props.text}
      </button>
    );
  }
}

export default GeneralButton;
