import { combineReducers } from 'redux';
import homeReducer from './home/home.reducers';

const appReducer = combineReducers({
    home: homeReducer,
})

const allReducers = (state, action) => {
    /*if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined;
    }*/

    return appReducer(state, action)
}

export default allReducers;