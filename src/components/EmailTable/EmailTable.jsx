import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    MdDelete, 
    MdDeleteForever, 
    MdReportProblem,
    MdUndo
} from 'react-icons/lib/md';
import EmailTableActionBar from '../EmailTableActionBar/EmailTableActionBar';
import ActionBarButton from '../ActionBarButton/ActionBarButton';
import EmailTableItem from '../EmailTableItem/EmailTableItem';
import EmailTableItemSeparator from '../EmailTableItemSeparator/EmailTableItemSeparator';
import {selectEmails, markAsDeleted, markAsSpam} from '../../redux/actions/email-actions';
import {
    INBOX, 
    DRAFTS, 
    SENT, 
    SPAM, 
    TRASH,
    ACTION_BAR_BUTTON_DELETE,
    ACTION_BAR_BUTTON_RESTORE,
    ACTION_BAR_BUTTON_SPAM,
    ACTION_BAR_BUTTON_NOT_SPAM
} from '../../constants/strings';

var _ = require('lodash');

const propTypes = {
    page: PropTypes.string.isRequired
};

export class EmailTable extends React.Component {

    constructor() {
        super();

        this.handleMarkAsDeletedButtonClicked = this.handleMarkAsDeletedButtonClicked.bind(this);
        this.handleMarkAsSpamButtonClicked = this.handleMarkAsSpamButtonClicked.bind(this);
        this.handlePermanentlyDeleteButtonClicked = this.handlePermanentlyDeleteButtonClicked.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.page !== this.props.page) {
            // new page, so unselect previous emails
            this.props.selectEmails([], false, true);
        }
    }

    /**
     * Called when the user clicks the delete button (when enabled).
     * @param {object} e The event object
     * @param {bool} shouldMark Indicates if the emails should be marked or unmarked as deleted.
     */
    handleMarkAsDeletedButtonClicked(e, shouldMark) {
        this.props.markAsDeleted(this.props.selectedEmails, shouldMark);
    }

    /**
     * Called when the user clicks the mark as spam button (when enabled).
     * @param {object} e The event object
     * @param {bool} shouldMark Indicates if the emails should be marked or unmarked as spam.
     */
    handleMarkAsSpamButtonClicked(e, shouldMark) {
        this.props.markAsSpam(this.props.selectedEmails, shouldMark);
    }

    /**
     * Called when the user clicks the permanent delete button (when enabled).
     * @param {object} e The event object
     */
    handlePermanentlyDeleteButtonClicked(e) {
        this.props.permanentlyDelete(this.props.selectedEmails);
    }

    /**
     * Gets the emails and action bar buttons for this page.
     * @returns {object} An object containing the emails and action bar buttons for this page.
     */
    getTableObjects() {

        let obj;
        let isActionBarButtonEnabled = this.props.selectedEmails.length > 0;
        let i = 0;
        let iconSize = 20;

        switch (this.props.page) {
            case INBOX:
                obj = {
                    emails: _.filter(this.props.emails, x => x.isInInbox()),
                    actionBarButtons: [
                        <ActionBarButton
                            key={i++}
                            icon={<MdDelete size={iconSize} />}
                            text={ACTION_BAR_BUTTON_DELETE}
                            isEnabled={isActionBarButtonEnabled} 
                            onClick={(e) => this.handleMarkAsDeletedButtonClicked(e, true)}
                        />,
                        <ActionBarButton
                            key={i++}
                            icon={<MdReportProblem size={iconSize} />}
                            text={ACTION_BAR_BUTTON_SPAM}
                            isEnabled={isActionBarButtonEnabled}
                            onClick={(e) => this.handleMarkAsSpamButtonClicked(e, true)}
                        />
                    ]
                };
                break;
            case DRAFTS:
                obj = {
                    emails: _.filter(this.props.emails, x => x.getIsDraft()),
                    actionBarButtons: [
                        <ActionBarButton
                            key={i++}
                            icon={<MdDeleteForever size={iconSize} />}
                            text={ACTION_BAR_BUTTON_DELETE}
                            isEnabled={isActionBarButtonEnabled} 
                            onClick={this.handlePermanentlyDeleteButtonClicked}
                        />
                    ]
                };
                break;
            case SENT:
                obj = {
                    emails: _.filter(this.props.emails, x => x.getIsSent()),
                    actionBarButtons: [
                        <ActionBarButton
                            key={i++}
                            icon={<MdDeleteForever size={iconSize} />}
                            text={ACTION_BAR_BUTTON_DELETE}
                            isEnabled={isActionBarButtonEnabled} 
                            onClick={this.handlePermanentlyDeleteButtonClicked}
                        />
                    ]
                };
                break;
            case SPAM:
                obj = {
                    emails: _.filter(this.props.emails, x => x.getIsSpam()),
                    actionBarButtons: [
                        <ActionBarButton
                            key={i++}
                            icon={<MdDeleteForever size={iconSize} />}
                            text={ACTION_BAR_BUTTON_DELETE}
                            isEnabled={isActionBarButtonEnabled} 
                            onClick={this.handlePermanentlyDeleteButtonClicked}
                        />,
                        <ActionBarButton
                            key={i++}
                            icon={<MdUndo size={iconSize} />}
                            text={ACTION_BAR_BUTTON_NOT_SPAM} 
                            isEnabled={isActionBarButtonEnabled}
                            onClick={(e) => this.handleMarkAsSpamButtonClicked(e, false)}
                        />
                    ]
                };
                break;
            case TRASH:
                obj = {
                    emails: _.filter(this.props.emails, x => x.getDeletionTimestampUTC()),
                    actionBarButtons: [
                        <ActionBarButton
                            key={i++}
                            icon={<MdDeleteForever size={iconSize} />}
                            text={ACTION_BAR_BUTTON_DELETE}
                            isEnabled={isActionBarButtonEnabled} 
                            onClick={this.handlePermanentlyDeleteButtonClicked}
                        />,
                        <ActionBarButton
                            key={i++}
                            icon={<MdUndo size={iconSize} />}
                            text={ACTION_BAR_BUTTON_RESTORE}
                            isEnabled={isActionBarButtonEnabled} 
                            onClick={(e) => this.handleMarkAsDeletedButtonClicked(e, false)}
                        />
                    ]
                };
                break;
            default:
                break;
        }

        return obj;
    }

    /**
     * Gets the list of email items that will appear in the table.
     * The emails will be filtered based on the page that is loaded.
     * @param {Email[]} emails The emails to show.
     * @returns The list of EmailTableItems.
     */
    getEmailTableItems(emails) {
        return (emails)
            ? emails.map((email) => {
                return (
                    <React.Fragment key={email.getId()}>
                        <EmailTableItem email={email} />
                        <EmailTableItemSeparator />
                    </React.Fragment>
                );
            })
            : null;
    }

    render() {
        let tableObjects = this.getTableObjects();
        
        return (
            <div className="EmailTable">
                <EmailTableActionBar
                    emails={tableObjects.emails}
                    actionBarButtons={tableObjects.actionBarButtons}
                    onSelectAllChecked={this.handleSelectAllChecked} />
                <EmailTableItemSeparator />
                {this.getEmailTableItems(tableObjects.emails)}
            </div>
        );
    }

}

EmailTable.propTypes = propTypes;

function mapStateToProps(store, ownProps) {
    return {
        emails: store.email.emails,
        selectedEmails: store.email.selectedEmails,
        page: ownProps.page
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            selectEmails: selectEmails,
            markAsDeleted: markAsDeleted,
            markAsSpam: markAsSpam
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTable);