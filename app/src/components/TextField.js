import React from 'react';
import './components/TextField.css';

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

class TextField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    validateForm() {
        if(this.props.required) {
            return this.state.content.length > 0;
        }
        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

}