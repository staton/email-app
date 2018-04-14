// https://reactjs.org/docs/composition-vs-inheritance.html
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActionBar from '../ActionBar/ActionBar';
import Checkbox from '../Checkbox/Checkbox';
import {selectEmails, markAsDeleted, markAsSpam} from '../../redux/actions/email-actions';
import Email from '../../models/email';

const propTypes = {
    emails: PropTypes.arrayOf(PropTypes.instanceOf(Email)).isRequired,
    actionBarButtons: PropTypes.arrayOf(PropTypes.element)
};

const defaultProps = {
    actionBarButtons: null
};

export class EmailTableActionBar extends React.Component {

    constructor() {
        super();

        this.handleSelectAllChecked = this.handleSelectAllChecked.bind(this);
    }

    /**
     * Called when the user clicks on the checkbox.
     * @param {object} e The event object.
     */
    handleSelectAllChecked(e) {
        this.props.selectEmails(this.props.emails, e.target.checked, true);
    }

    render() {
        return (
            <ActionBar>
                <div className="EmailTableActionBar">
                    <div className="checkbox-container">
                        <Checkbox 
                            isEnabled={this.props.emails.length > 0}
                            isChecked={this.props.isSelectAllChecked}
                            onCheck={this.handleSelectAllChecked} />
                    </div>
                    <div className="action-buttons-container">
                        {this.props.actionBarButtons}
                    </div>
                    <div className="empty-container"></div>
                </div>
            </ActionBar>
        );
    }

}

EmailTableActionBar.propTypes = propTypes;
EmailTableActionBar.defaultProps = defaultProps;

function mapStateToProps(store, ownProps) {
    return {
        isSelectAllChecked: store.email.isSelectAllChecked,
        emails: ownProps.emails,
        actionBarButtons: ownProps.actionBarButtons
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            selectEmails: selectEmails
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTableActionBar);