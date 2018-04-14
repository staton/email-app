import {
    EMAIL_ADD,
    EMAIL_MARK_AS_DELETED,
    EMAIL_MARK_AS_IMPORTANT,
    EMAIL_MARK_AS_READ,
    EMAIL_MARK_AS_SPAM,
    EMAIL_PERMANENTLY_DELETE,
    EMAIL_SAVE_DRAFT,
    EMAIL_SELECT,
    EMAIL_SEND
} from '../types';
import {
    USER_EMAIL, 
    INBOX, DRAFTS, 
    SENT, 
    SPAM, 
    TRASH
} from '../../constants/strings';
import Email from '../../models/email';

var _ = require('lodash');

// to do: set emails to empty, and load from mock api
const INITIAL_STATE = {
    emails: [],
    selectedEmails: [],
    isSelectAllChecked: false,
    count: {
        inbox: 0,
        sent: 0,
        spam: 0,
        trash: 0
    },
    isEmailSending: false
};

/**
* Manipulates the 'navigation' state value.
*
* @function
* @param {boolean} state - The current state of the navigation.
* @param {object} action - The action to be performed.
* @return The new value for the 'navigation' state.
*/
export default function(state = INITIAL_STATE, action) {

    switch (action.type) {

        case EMAIL_ADD:

            return addEmails(state, action.payload);

        case EMAIL_MARK_AS_DELETED:

            return markAsDeleted(state, action.payload);

        case EMAIL_MARK_AS_IMPORTANT:

            return markAsImportant(state, action.payload);

        case EMAIL_MARK_AS_READ:

            return markAsRead(state, action.payload);

        case EMAIL_MARK_AS_SPAM:

            return markAsSpam(state, action.payload);

        case EMAIL_PERMANENTLY_DELETE:

            return permanentlyDelete(state, action.payload);

        case EMAIL_SAVE_DRAFT:

            return saveDraft(state, action.payload);

        case EMAIL_SELECT:

            return selectEmails(state, action.payload);

        case EMAIL_SEND:

            return sendEmail(state, action.payload);

        default:

            return state;
    }

};

/**
 * Adds emails to the state.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function addEmails(state, payload) {
    let emails = state.emails.slice();
    emails.push(...payload.emails);

    return {
        ...state,
        emails: _.sortBy(emails, x => x.getTimestampUTC()).reverse()
    };
}

/**
 * Marks emails as deleted or not.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function markAsDeleted(state, payload) {

    let deletionTime = (payload.isDeleted)
        ? Date.now()
        : null;

    // TODO: optimize this function
    let allEmails = state.emails.slice();
    let selectedEmails = payload.emails.slice();

    for (let i = 0; i < selectedEmails.length; i++) {
        let email = _.find(allEmails, x => x.getId() == selectedEmails[i].getId());

        if (email) {
            email.setDeletionTimestampUTC(deletionTime);
        }
    }

    return {
        ...state,
        emails: allEmails,
        selectedEmails: []
    };
}

/**
 * Marks emails as important or not.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function markAsImportant(state, payload) {
    
    // TODO: optimize this function
    let allEmails = state.emails.slice();
    let selectedEmails = payload.emails.slice();

    for (let i = 0; i < selectedEmails.length; i++) {
        let email = _.find(allEmails, x => x.getId() == selectedEmails[i].getId());

        if (email) {
            email.setIsImportant(payload.isImportant);
        }
    }

    return {
        ...state,
        emails: allEmails,
        selectedEmails: []
    };
}

/**
 * Marks emails as read or unread.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function markAsRead(state, payload) {

    // TODO: optimize this function
    let allEmails = state.emails.slice();
    let selectedEmails = payload.emails.slice();

    for (let i = 0; i < selectedEmails.length; i++) {
        let email = _.find(allEmails, x => x.getId() == selectedEmails[i].getId());

        if (email) {
            email.setIsRead(payload.isRead);
        }
    }

    return {
        ...state,
        emails: allEmails,
        selectedEmails: []
    };
}

/**
 * Marks emails as spam or not.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function markAsSpam(state, payload) {

    // TODO: optimize this function
    let allEmails = state.emails.slice();
    let selectedEmails = payload.emails.slice();

    for (let i = 0; i < selectedEmails.length; i++) {
        let email = _.find(allEmails, x => x.getId() == selectedEmails[i].getId());

        if (email) {
            email.setIsSpam(payload.isSpam);
        }
    }

    return {
        ...state,
        emails: allEmails,
        selectedEmails: []
    };
}

/**
 * Permanently deletes the given emails.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function permanentlyDelete(state, payload) {
    return state;
}

/**
 * Saves the email as a draft.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function saveDraft(state, payload) {
    // make sure to set the 'isDraft' to true
    return state;
}

/**
 * Selects or deselects the given emails.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function selectEmails(state, payload) {
    
    let selectedEmails = [];
    let isSelectAllChecked = state.isSelectAllChecked;

    if (payload.isSelected) {

        // Add the newly selected emails to the list of selected emails:
        if (payload.isSelectAll) {
            // select all checkbox was checked
            selectedEmails = _.union(state.selectedEmails.slice(), payload.emails);
            isSelectAllChecked = true;
        } else {
            // individual email was selected
            selectedEmails = _.union(state.selectedEmails.slice(), payload.emails);
        }

    } else {

        // Remove the newly unselected emails from the list of selected emails:
        if (payload.isSelectAll) {
            // select all checkbox was unchecked
            selectedEmails = [];
            isSelectAllChecked = false;
        } else {
            selectedEmails = state.selectedEmails.slice();
            _.pullAll(selectedEmails, payload.emails);

            if (isSelectAllChecked) {
                // if select all checkbox was already checked, but the user clicked to unselect
                // an individual email, remember to uncheck the select all checkbox
                isSelectAllChecked = false;
            }
        }

    }

    return {
        ...state,
        selectedEmails: _.sortBy(selectedEmails, email => email.getId()),
        isSelectAllChecked: isSelectAllChecked
    };
}

/**
 * Sends the given email.
 * @param {object} state The current state.
 * @param {object} payload The payload from the action.
 * @returns {object} The new state.
 */
function sendEmail(state, payload) {
    // make to set the sent email has isDraft = false
    return state;
}