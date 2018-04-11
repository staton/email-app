import { combineReducers } from 'redux';
import emailReducer from './email-reducer';
import navigationReducer from './navigation-reducer';

const allReducers = combineReducers({
    email: emailReducer,
    navigation: navigationReducer
});

export default allReducers;