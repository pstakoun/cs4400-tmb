import React from 'react';
import './Button.css';

class GeneralButton extends React.Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    render() {
        return (
            <button
                className={"Button"}
                block
                bsSize="large"
                type="submit"
                onClick={this.props.handlePress}
            >
                {this.props.text}
            </button>
        );
    }
}

export default GeneralButton;