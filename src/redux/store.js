import { createStore, applyMiddleware } from 'redux';
import allReducers from './root.Reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root.Sagas';
import logger from 'redux-logger';

/**
 * this creates sagamiddleware function for handling api calls
 */
const sagaMiddleware = createSagaMiddleware();
/**
 * createStore, generates single store object using redcuers and sagamiddleware. This store holds our entire application state.
 */
const store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store;