import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
    isEnabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

const defaultProps = {
    icon: null,
    text: null,
    isEnabled: true
};

class ActionBarButton extends React.Component {

    render() {
        return (
            <button 
                className="ActionBarButton basic-ease-out-fast"
                disabled={!this.props.isEnabled}
                onClick={this.props.onClick}
            >
                <div className="action-bar-button-content">
                    {this.props.icon}
                    <span className="action-bar-button-text">
                        {this.props.text}
                    </span>
                </div>
            </button>
        );
    }

}

ActionBarButton.propTypes = propTypes;
ActionBarButton.defaultProps = defaultProps;

export default ActionBarButton;