import * as actions from './email-actions';
import Email from '../../models/email';

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

describe('Email Actions', () => {

    const generateEmail = () => {
        return new Email(
            'ADf0sdfyD93ksdfl2',
            'to@abc.com', 
            'from@xyz.com', 
            null, 
            null, 
            'hello', 
            'how are you', 
            1234567890,
            false);
    };

    it('creates an add email action', () => {
        const emails = [ generateEmail() ];
        const expectedAction = {
            type: EMAIL_ADD,
            payload: {
                emails: emails
            }
        };

        let action = actions.addEmails(emails);
        expect(action).toEqual(expectedAction);
    });

    it('creates a mark as deleted action', () => {
        const emails = [ generateEmail() ];
        const isDeleted = true;
        const expectedAction = {
            type: EMAIL_MARK_AS_DELETED,
            payload: {
                emails: emails,
                isDeleted: isDeleted
            }
        };

        let action = actions.markAsDeleted(emails, isDeleted);
        expect(action).toEqual(expectedAction);
    });

    it('creates a mark as important action', () => {
        const emails = [ generateEmail() ];
        const isImportant = true;
        const expectedAction = {
            type: EMAIL_MARK_AS_IMPORTANT,
            payload: {
                emails: emails,
                isImportant: isImportant
            }
        };

        let action = actions.markAsImportant(emails, isImportant);
        expect(action).toEqual(expectedAction);
    });

    it('creates a mark as read action', () => {
        const emails = [ generateEmail() ];
        const isRead = true;
        const expectedAction = {
            type: EMAIL_MARK_AS_READ,
            payload: {
                emails: emails,
                isRead: isRead
            }
        };

        let action = actions.markAsRead(emails, isRead);
        expect(action).toEqual(expectedAction);
    });

    it('creates a mark as spam action', () => {
        const emails = [ generateEmail() ];
        const isSpam = true;
        const expectedAction = {
            type: EMAIL_MARK_AS_SPAM,
            payload: {
                emails: emails,
                isSpam: isSpam
            }
        };

        let action = actions.markAsSpam(emails, isSpam);
        expect(action).toEqual(expectedAction);
    });

    it('creates a permanently delete email action', () => {
        const emails = [ generateEmail() ];
        const expectedAction = {
            type: EMAIL_PERMANENTLY_DELETE,
            payload: {
                emails: emails
            }
        };

        let action = actions.permanentlyDelete(emails);
        expect(action).toEqual(expectedAction);
    });

    it('creates a save draft action', () => {
        const email = generateEmail();
        const expectedAction = {
            type: EMAIL_SAVE_DRAFT,
            payload: {
                email: email
            }
        };

        let action = actions.saveDraft(email);
        expect(action).toEqual(expectedAction);
    });

    it('creates a select email action', () => {
        const emails = [ generateEmail() ];
        const isSelected = true;
        const expectedAction = {
            type: EMAIL_SELECT,
            payload: {
                emails: emails,
                isSelected: isSelected,
                isSelectAll: false
            }
        };

        let action = actions.selectEmails(emails, isSelected);
        expect(action).toEqual(expectedAction);
    });

    it('creates a send email action', () => {
        const email = generateEmail();
        const expectedAction = {
            type: EMAIL_SEND,
            payload: {
                email: email
            }
        };

        let action = actions.sendEmail(email);
        expect(action).toEqual(expectedAction);
    });

});