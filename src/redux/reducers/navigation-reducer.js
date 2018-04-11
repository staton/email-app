import {TOGGLE_DRAWER} from '../types';

const INITIAL_STATE =  {
    isDrawerVisible: true
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

        case TOGGLE_DRAWER:

            return { ...state, isDrawerVisible: !state.isDrawerVisible };

        default:

            return state;
    }

};