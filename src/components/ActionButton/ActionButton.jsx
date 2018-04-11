import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    text: PropTypes.any.isRequired,
    onActionButtonClick: PropTypes.func.isRequired
};

class ActionButton extends React.Component {

    render() {
        return (
            <button 
                className="ActionButton basic-ease-out-fast"
                onClick={this.props.onActionButtonClick}>
                {this.props.text}
            </button>
        );
    }
}

ActionButton.propTypes = propTypes;

export default ActionButton;