import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    isChecked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool
};

const defaultProps = {
    isEnabled: true
};

class Checkbox extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        // only update the component if the checkbox state changed
        // this isn't necessary, it simply prevents unneeded updates.
        return nextProps.isChecked != this.props.isChecked
            || nextProps.isEnabled != this.props.isEnabled;
    }

    render() {
        return (
            <input 
                className="Checkbox"
                type="checkbox"
                checked={this.props.isChecked}
                disabled={!this.props.isEnabled}
                onChange={this.props.onCheck} />
        );
    }

}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;