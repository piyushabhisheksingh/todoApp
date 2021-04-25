import { combineReducers } from 'redux';
import todoReducer from './todo/todo.reducers';

const appReducer = combineReducers({
    todo: todoReducer,
})

const allReducers = (state, action) => {
    return appReducer(state, action)
}


export default allReducers;