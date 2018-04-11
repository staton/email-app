import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import EmailTableActionBar from '../EmailTableActionBar/EmailTableActionBar';
import EmailTableItem from '../EmailTableItem/EmailTableItem';
import EmailTableItemSeparator from '../EmailTableItemSeparator/EmailTableItemSeparator';
import * as EmailActions from '../../redux/actions/email-actions';
import {
    USER_EMAIL, 
    INBOX, DRAFTS, 
    SENT, 
    SPAM, 
    TRASH
} from '../../constants/strings';

var _ = require('lodash');

const propTypes = {
    page: PropTypes.string.isRequired
};

class EmailTable extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.page !== this.props.page) {
            // new page, so unselect previous emails
            this.props.selectEmail([], false, true);
        }
    }

    /**
     * Gets the emails for this table.
     * @returns The array of emails for this table.
     */
    getEmails() {

        let emails;

        switch (this.props.page) {
            case INBOX:
                emails = _.filter(this.props.emails, x => x.isInInbox());
                break;
            case DRAFTS:
                emails = _.filter(this.props.emails, x => x.getIsDraft());
                break;
            case SENT:
                emails = _.filter(this.props.emails, x => x.getIsSent());
                break;
            case SPAM:
                emails = _.filter(this.props.emails, x => x.getIsSpam());
                break;
            case TRASH:
                emails = _.filter(this.props.emails, x => x.getDeletionTimestampUTC());
                break;
            default:
                break;
        }

        return emails;
    }

    /**
     * Gets the list of email items that will appear in the table.
     * The emails will be filtered based on the page that is loaded.
     * @param {Email[]} emails The emails to show.
     * @returns The list of EmailTableItems.
     */
    getEmailItems(emails) {

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
        let emails = this.getEmails();

        return (
            <div className="EmailTable">
                <EmailTableActionBar emails={emails} />
                <EmailTableItemSeparator />
                {this.getEmailItems(emails)}
            </div>
        );
    }

}

EmailTable.propTypes = propTypes;

function mapStateToProps(store, ownProps) {
    return {
        emails: store.email.emails
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            selectEmail: EmailActions.selectEmails
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTable);