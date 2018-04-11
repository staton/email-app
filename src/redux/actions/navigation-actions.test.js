import * as actions from './navigation-actions';
import {TOGGLE_DRAWER} from '../types';

describe('navigation actions', () => {

    it('creates a toggle drawer action', () => {
        const expectedAction = {
            type: TOGGLE_DRAWER,
            payload: {}
        };

        let action = actions.toggleDrawer();
        expect(action).toEqual(expectedAction);
    });

});