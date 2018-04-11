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

/**
 * Adds new email(s).
 * @param {Email[]} emails The list of emails to add.
 * @returns {object} The action.
 */
export const addEmails = (emails) => {
    return {
        type: EMAIL_ADD,
        payload: {
            emails: emails
        }
    };
};

/**
 * Marks email(s) as deleted or not.
 * @param {Email[]} emails The list of emails to mark as deleted/not deleted.
 * @param {bool} isDeleted Indicates if the emails are deleted or not.
 * @returns {object} The action.
 */
export const markAsDeleted = (emails, isDeleted) => {
    return {
        type: EMAIL_MARK_AS_DELETED,
        payload: {
            emails: emails,
            isDeleted: isDeleted
        }
    };
};

/**
 * Marks email(s) as important or not.
 * @param {Email[]} emails The list of emails to mark as important/not important.
 * @param {bool} isImportant Indicates if the emails are important or not.
 * @returns {object} The action.
 */
export const markAsImportant = (emails, isImportant) => {
    return {
        type: EMAIL_MARK_AS_IMPORTANT,
        payload: {
            emails: emails,
            isImportant: isImportant
        }
    };
};

/**
 * Marks email(s) as read or unread.
 * @param {Email[]} emails The list of emails to mark as read/unread.
 * @param {bool} isRead Indicates if the emails are read or unread.
 * @returns {object} The action.
 */
export const markAsRead = (emails, isRead) => {
    return {
        type: EMAIL_MARK_AS_READ,
        payload: {
            emails: emails,
            isRead: isRead
        }
    };
};

/**
 * Marks or unmarks the given emails as spam.
 * @param {Email[]} emails The emails to mark/unmark as spam.
 * @param {bool} isSpam Indicates if the email is spam or not.
 * @returns {object} The action.
 */
export const markAsSpam = (emails, isSpam) => {
    return {
        type: EMAIL_MARK_AS_SPAM,
        payload: {
            emails: emails,
            isSpam: isSpam
        }
    };
};

/**
 * Permanently deletes the given emails.
 * @param {Email[]} emails The emails to permanently delete.
 * @returns {object} The action.
 */
export const permanentlyDelete = (emails) => {
    return {
        type: EMAIL_PERMANENTLY_DELETE,
        payload: {
            emails: emails
        }
    };
};

/**
 * Saves the given email as a draft.
 * @param {Email} email The email to save as a draft.
 * @returns {object} The action.
 */
export const saveDraft = (email) => {
    return {
        type: EMAIL_SAVE_DRAFT,
        payload: {
            email: email
        }
    };
};

/**
 * Selects or unselects the given emails.
 * @param {Email[]} emails The emails to select/unselect.
 * @param {bool} isSelected Indicates if the emails are selected or unselected.
 * @param {bool} isSelectAll Indicates the select all checkbox was checked.
 * @returns {object} The action.
 */
export const selectEmails = (emails, isSelected, isSelectAll = false) => {
    return {
        type: EMAIL_SELECT,
        payload: {
            emails: emails,
            isSelected: isSelected,
            isSelectAll: isSelectAll
        }
    };
};

/**
 * Sends an email.
 * @param {Email} email The email to send.
 * @param {bool} isReply Indicates if the email is replying to another one.
 * @returns {object} The action.
 */
export const sendEmail = (email, isReply) => {
    return {
        type: EMAIL_SEND,
        payload: {
            email: email,
            isReply: isReply
        }
    };
};