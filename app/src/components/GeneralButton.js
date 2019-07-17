import React from 'react';
import './GeneralButton.css';

class GeneralButton extends React.Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        // TODO
    }

    validateForm() {
        if(this.props.required) {
            return this.state.content.length > 0;
        }
        return true;
    }

    render() {
        return (
            <button
                className={"GeneralButton"}
                type="submit"
                onClick={this.handlePress}
                disabled={!this.validateForm()}
            >
                {this.props.text}
            </button>
        );
    }
}

export default GeneralButton;