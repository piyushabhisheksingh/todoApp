import * as types from './search.Types';
import { stocksprefix } from '../../utils/commonFunctions'

/**
 * searchAction, it takes 3 params and calls the search api function
 */
export const search = (index, input, prevIndex, delay) => {
    /**
    * @param {number|string|number} index input prevIndex - index is the current selectedTab, input is the user search query and prevIndex of selected tab
    */
    let params = stocksprefix(index, input);
    return {
        type: types.SEARCH,
        params,
        scrip: input,
        mode: index,
        prevIndex,
        delay
    }
}

/**
 * clearSearchState, this will not take any argument and it clears the search text input
 */
export const clearSearchState = () => {
    return {
        type: types.CLEAR_SEARCH_STATE
    }
}

/**
 * recentSearch, this will not take any argument and it will set a state for recent search
 */
// export const recentSearch = () => {
//     return {
//         type: types.RECENT_SEARCH
//     }
// }

/**
 * setSearchText, this will take one argument and sets the user search input
 */
export const setSearchText = (payload, key) => {
    /**
    * @param {string} payload - payload is the user search input
    */
    return {
        type: types.SET_SEARCH_TEXT,
        payload,
        key
    }
}

/**
 * setTab, this will take one argument and sets the selected tab
 */
export const setTab = (payload) => {
    /**
   * @param {number} payload - payload is the user selectedTabIndex
   */
    return {
        type: types.SET_SELECTED_TAB,
        payload
    }
}

/**
 * clearState, this will not take any arguments and it clear the result array
 */
export const clearState = () => {
    return {
        type: types.CLEAR_RESULT
    }
}

export const addStock = (payload, onSuccess, onError) => {
    return {
        type: types.ADD_STOCK,
        payload,
        onSuccess,
        onError
    }
}

export const deleteStock = (payload, onSuccess, onError) => {
    return {
        type: types.DELETE_STOCK,
        payload,
        onSuccess,
        onError
    }
}

export const addStockToRecent = (payload) => {
    return {
        type: types.ADD_RECENTSTOCK,
        payload
    }
}

