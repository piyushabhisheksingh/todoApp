import appState, { todoListItem } from './todo.state';
import * as types from './todo.types'
import { labels } from "../../assets";
const { ALL } = labels;

const todoReducer = (state = appState.todo, action) => {
    switch (action.type) {

        case types.SELECT_FILTER: {
            return {
                ...state,
                selectedFilter: action.payload
            }
        }
        case types.ADD_NEW: {
            return {
                ...state,
                todoList: [new todoListItem({ todoText: action.payload }), ...state.todoList],
                selectedFilter: ALL
            }
        }
        case types.FAVORITE_CLICKED: {
            let todoList = state.todoList;
            let index = todoList.findIndex((item) => item.id == action.payload)
            if (index > -1) {
                todoList[index].isFavourites = !todoList[index].isFavourites;
            }
            return {
                ...state,
                todoList
            }
        }
        case types.MENU_CLICKED: {
            return {
                ...state,
                isMenuOpen: action.payload,
                openMenuId: action.id ? action.id : state.openMenuId
            }
        }
        case types.DELETE_ITEM: {
            let todoList = state.todoList;
            todoList = todoList.filter((item) => item.id != action.payload)
            return {
                ...state,
                todoList,
                isMenuOpen: false
            }
        }
        case types.EDIT_ITEM: {
            let todoList = state.todoList;
            let index = todoList.findIndex((item) => item.id == action.payload.id)
            if (index > -1) {
                todoList[index].todoText = action.payload.todoText;
            }
            return {
                ...state,
                todoList,
                isMenuOpen: false
            }
        }
        case types.SET_COMPLETED: {
            let todoList = state.todoList;
            let index = todoList.findIndex((item) => item.id == action.payload)
            if (index > -1) {
                todoList[index].isCompleted = true;
                todoList[index].isFavourites = false;
            }
            return {
                ...state,
                todoList,
                isMenuOpen: false
            }
        }
        case types.UPDATE_STATE: {
            return {
                ...state,
                todoList: action.list
            }
        }
        default:
            return state
    }
}
export default todoReducer;