import { createStore, applyMiddleware } from 'redux';
import allReducers from './root.reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root.sagas';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store;