import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const propTypes = {
    linkTo: PropTypes.string.isRequired,
    text: PropTypes.any.isRequired
};

class DrawerMenuItem extends React.Component {

    render() {
        return (
            <li className="DrawerMenuItem basic-ease-out-fast">
                <Link to={this.props.linkTo}>
                    <div className="link-container">
                        {this.props.text}
                    </div>
                </Link>
            </li>
        );
    }
}

DrawerMenuItem.propTypes = propTypes;

export default DrawerMenuItem;