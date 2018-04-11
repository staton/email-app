import navigationReducer from './navigation-reducer';
import * as actions from '../actions/navigation-actions';

describe('navigation reducer', () => {

    const getInitialState = () => {
        return {
            isDrawerVisible: true
        };
    };

    it('returns the initial state', () => {
        const newState = navigationReducer(undefined, {});
        const expectedState = getInitialState();

        expect(newState).toEqual(expectedState);
    });

    it('shows the drawer', () => {
        const state = getInitialState();
        state.isDrawerVisible = false;

        const action = actions.toggleDrawer();
        const newState = navigationReducer(state, action);
        const expectedState = {
            ...state,
            isDrawerVisible: true
        };

        expect(newState).toEqual(expectedState);
    });

    it('hides the drawer', () => {
        const state = getInitialState();
        state.isDrawerVisible = true;

        const action = actions.toggleDrawer();
        const newState = navigationReducer(state, action);
        const expectedState = {
            ...state,
            isDrawerVisible: false
        };

        expect(newState).toEqual(expectedState);
    });

});