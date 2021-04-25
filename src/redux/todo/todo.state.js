import { labels } from "../../assets";
const { ALL } = labels;
// import { v4 as uuidv4 } from 'uuid';


export const todoListItem = (item) => {
  const { todoText = "", isCompleted = false, isFavourites = false } = item;
  return {
    todoText,
    isCompleted,
    isFavourites,
    id: Date.now()
  }
}

export default {
  todo: {
    todoList: [],
    selectedFilter: ALL,
    isMenuOpen: false,
    openMenuId: ''
  }
};