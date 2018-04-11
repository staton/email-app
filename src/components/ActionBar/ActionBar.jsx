// https://reactjs.org/docs/composition-vs-inheritance.html
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

class ActionBar extends React.Component {

    render() {
        return (
            <div className="ActionBar">
                {this.props.children}
            </div>
        );
    }
}

ActionBar.propTypes = propTypes;
ActionBar.defaultProps = defaultProps;

export default ActionBar;