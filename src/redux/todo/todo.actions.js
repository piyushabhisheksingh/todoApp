import * as types from './todo.types';


export const selectFilter = (payload) => {
    return {
        type: types.SELECT_FILTER,
        payload

    }
}
export const addNewAction = (payload) => {
    return {
        type: types.ADD_NEW,
        payload

    }
}
export const favouriteClicked = (payload) => {
    return {
        type: types.FAVORITE_CLICKED,
        payload
    }
}

export const menuClicked = (payload, id) => {
    return {
        type: types.MENU_CLICKED,
        payload,
        id
    }
}
export const deleteItem = (payload) => {
    return {
        type: types.DELETE_ITEM,
        payload
    }
}
export const editItem = (payload) => {
    return {
        type: types.EDIT_ITEM,
        payload,
    }
}
export const setCompleted = (payload) => {
    return {
        type: types.SET_COMPLETED,
        payload,
    }
}

export const saveState = () => {
    return {
        type: types.SAVE_STATE,
    }
}

export const getStateAction = () => {
    return {
        type: types.GET_STATE,
    }
}








