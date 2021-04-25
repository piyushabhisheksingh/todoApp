import { all } from 'redux-saga/effects';
import { watchGetState, watchSaveState } from './todo/todo.sagas'

function* rootSaga() {
    yield all([
        watchGetState(),
        watchSaveState()
    ])
}
export default rootSaga;
