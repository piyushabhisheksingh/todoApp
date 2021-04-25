import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from './todo.types';
import { setInfo, getInfo } from '../../utls/localStorage';
import { constants } from '../../assets';
const { TODO_LIST } = constants
import store from '../store'


export function* saveState(action) {
    try {
        console.log("called")
        yield call(setInfo, TODO_LIST, store.getState().todo.todoList)

    } catch (error) {

    }
}

export function* watchSaveState() {
    yield takeLatest(types.SAVE_STATE, saveState)
}
export function* getStateSaga(action) {
    try {
        const list = yield call(getInfo, TODO_LIST)
        console.log("called saga", list)
        if (list && list[0]) {
            yield put({ type: types.UPDATE_STATE, list })
        }

    } catch (error) {
        console.log(error.toString())
    }
}

export function* watchGetState() {
    yield takeLatest(types.GET_STATE, getStateSaga)
}

