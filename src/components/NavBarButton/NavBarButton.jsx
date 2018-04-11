import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onNavBarButtonClick: PropTypes.func.isRequired,
    icon: PropTypes.any.isRequired
};

class NavBarButton extends React.Component {

    render() {
        return (
            <button 
                className="NavBarButton"
                onClick={this.props.onNavBarButtonClick}>
                {this.props.icon}
            </button>
        );
    }

}

NavBarButton.propTypes = propTypes;

export default NavBarButton;