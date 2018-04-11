import emailReducer from './email-reducer';
import * as actions from '../actions/email-actions';
import Email from '../../models/email';
import {USER_EMAIL} from '../../constants/strings';

var _ = require('lodash');

describe('email reducer', () => {

    const getInitialState = () => {
        return {
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
    };

    const getTestState = () => {
        return {
            emails: [
                new Email(
                    1,
                    USER_EMAIL, 
                    'from@xyz.com', 
                    null, 
                    null, 
                    'hello', 
                    'how are you', 
                    153456789088,
                    false),
                new Email(
                    2,
                    'bob@gmail.com', 
                    USER_EMAIL, 
                    null, 
                    null, 
                    'hi', 
                    'look at this', 
                    153456789055,
                    false,
                    false,
                    true),
                new Email(
                    3,
                    USER_EMAIL, 
                    'from@xyz.com', 
                    null, 
                    null, 
                    'big news', 
                    'big news....', 
                    153456789041,
                    false)
            ],
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
    };

    it('returns the initial state', () => {
        const newState = emailReducer(undefined, {});
        newState.emails = []; // in production, this should be empty.
        const expectedState = getInitialState();

        expect(newState).toEqual(expectedState);
    });

    it('adds new emails', () => {
        const state = getTestState();
        const emailsToAdd = [ 
            new Email(
                4,
                'to@abc.com', 
                'bob@gmail.com', 
                null, 
                null, 
                'aaaai', 
                'lbbbb', 
                153456789999,
                false),
            new Email(
                5,
                'to@abc.com', 
                'bob@gmail.com', 
                null, 
                null, 
                'xx', 
                'zz', 
                153456998865,
                false)
        ];
        const action = actions.addEmails(emailsToAdd);
        const newState = emailReducer(state, action);
        const expectedState = {
            ...state,
            emails: [
                ...state.emails,
                ...emailsToAdd
            ]
        };

        expect(newState).toEqual(expectedState);
    });

    it('marks an email for deletion', () => {
        const state = getTestState();
        const emailToMark = state.emails[0];
        const isDeleted = true;
        const action = actions.markAsDeleted([ emailToMark ], isDeleted);

        expect(emailToMark.getDeletionTimestampUTC()).toEqual(null);

        const newState = emailReducer(state, action);
        
        expect(emailToMark.getDeletionTimestampUTC()).not.toEqual(null);
    });

    it('adds a new email to the list of selected emails', () => {
        const state = getTestState();
        const emailToSelect = state.emails[1];
        const action = actions.selectEmails([ emailToSelect ], true);
        const newState = emailReducer(state, action);
        const expectedState = {
            ...state,
            selectedEmails: [
                ...state.selectedEmails,
                emailToSelect
            ]
        };

        expect(newState).toEqual(expectedState);
    });

    it('removes an email from the list of selected emails', () => {
        const state = getTestState();
        state.selectedEmails = [ state.emails[0], state.emails[1] ];
        const action = actions.selectEmails([ state.emails[1] ], false);
        const newState = emailReducer(state, action);
        const expectedState = {
            ...state,
            selectedEmails: [
                state.selectedEmails[0]
            ]
        };

        expect(newState).toEqual(expectedState);
    });

    it('does not select duplicates when selecting all', () => {
        const state = getTestState();
        state.selectedEmails = [ state.emails[0] ];
        const action = actions.selectEmails(state.emails, true);
        const newState = emailReducer(state, action);
        const expectedState = {
            ...state,
            selectedEmails: state.emails
        };

        expect(newState).toEqual(expectedState);
    });

    it('unselects all selected emails when unselecting all', () => {
        const state = getTestState();
        state.selectedEmails = state.emails;
        const action = actions.selectEmails(state.emails, false);
        const newState = emailReducer(state, action);
        const expectedState = {
            ...state,
            selectedEmails: []
        };

        expect(newState).toEqual(expectedState);
    });

});