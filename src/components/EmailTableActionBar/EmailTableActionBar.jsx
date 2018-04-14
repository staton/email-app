// https://reactjs.org/docs/composition-vs-inheritance.html
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActionBar from '../ActionBar/ActionBar';
import Checkbox from '../Checkbox/Checkbox';
import ActionBarButton from '../ActionBarButton/ActionBarButton';
import {MdDelete, MdReportProblem} from 'react-icons/lib/md';
import * as EmailActions from '../../redux/actions/email-actions';
import Email from '../../models/email';

const propTypes = {
    emails: PropTypes.arrayOf(PropTypes.instanceOf(Email)).isRequired
};

export class EmailTableActionBar extends React.Component {

    constructor() {
        super();

        this.handleSelectAllChecked = this.handleSelectAllChecked.bind(this);
        this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this);
        this.handleMarkAsSpamButtonClicked = this.handleMarkAsSpamButtonClicked.bind(this);
    }

    /**
     * Called when the user clicks on the checkbox.
     * @param {object} e The event object.
     */
    handleSelectAllChecked(e) {
        this.props.selectEmails(this.props.emails, e.target.checked, true);
    }

    /**
     * Called when the user clicks the delete button (when enabled).
     * @param {object} e The event object
     */
    handleDeleteButtonClicked(e) {
        console.log('handle delete button clicked called');
    }

    /**
     * Called when the user clicks the mark as spam button (when enabled).
     * @param {object} e The event object
     */
    handleMarkAsSpamButtonClicked(e) {
        console.log('handle mark as spam button clicked called');
    }

    /**
     * Checks to see if the action bar buttons should be enabled or not.
     * @returns {bool} True if they should be enabled, false otherwise.
     */
    areActionBarButtonsEnabled() {
        return this.props.selectedEmails.length > 0;
    }

    render() {
        let isActionBarButtonEnabled = this.areActionBarButtonsEnabled();

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
                        <ActionBarButton
                            icon={<MdDelete size={24} />}
                            text="DELETE"
                            isEnabled={isActionBarButtonEnabled} 
                            onClick={this.handleDeleteButtonClicked}
                        />
                        <ActionBarButton
                            icon={<MdReportProblem size={24} />}
                            text="MARK AS SPAM" 
                            isEnabled={isActionBarButtonEnabled}
                            onClick={this.handleMarkAsSpamButtonClicked}
                        />
                    </div>
                    <div className="empty-container"></div>
                </div>
            </ActionBar>
        );
    }

}

EmailTableActionBar.propTypes = propTypes;

function mapStateToProps(store, ownProps) {
    return {
        isSelectAllChecked: store.email.isSelectAllChecked,
        selectedEmails: store.email.selectedEmails,
        emails: ownProps.emails
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            selectEmails: EmailActions.selectEmails
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTableActionBar);