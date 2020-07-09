import * as types from './search.Types';
import appState from '././search.State';
import lables from '../../utils/lables';
import { DeviceEventEmitter } from 'react-native';
import constants from '../../utils/appConstants'
import { eventName, LogEvents } from '../../../__analytics__/AppAnalytics';

/**
 * searchReducer, The reducer is a pure function that takes the previous state and an action, and returns the next state. (previousState, action) => nextState.
 */
const searchReducer = (state = appState.search, action) => {
    /**
    * @param {Object|string} state, action - state is the previousState and action is the particular action type.
    */
    switch (action.type) {
        case types.SEARCH: {

            if (action.prevIndex != action.mode) {
                if (action.prevIndex == 0) {
                    return {
                        ...state,
                        all: [],
                        news: [],
                        index: 3,
                        loading: { key: 0, state: true },
                        selectedTab: action.mode,
                        searchText: action.scrip,
                        recentSearchVisible: false

                    }
                }
                else if (action.prevIndex == 1) {
                    return {
                        ...state,
                        cash: [],
                        news: [],
                        index: 3,
                        loading: { key: 1, state: true },
                        selectedTab: action.mode,
                        searchText: action.scrip,
                        recentSearchVisible: false

                    }
                }
                else if (action.prevIndex == 2) {
                    return {
                        ...state,
                        fno: [],
                        news: [],
                        index: 3,
                        loading: { key: 2, state: true },
                        selectedTab: action.mode,
                        searchText: action.scrip,
                        recentSearchVisible: false

                    }
                }
                else if (action.prevIndex == 3) {
                    return {
                        ...state,
                        currency: [],
                        news: [],
                        index: 3,
                        loading: { key: 3, state: true },
                        selectedTab: action.mode,
                        searchText: action.scrip,
                        recentSearchVisible: false

                    }
                }
                else {
                    return {
                        ...state,
                        commodity: [],
                        news: [],
                        index: 3,
                        loading: { key: 4, state: true },
                        selectedTab: action.mode,
                        searchText: action.scrip,
                        recentSearchVisible: false

                    }
                }
            } else {
                return {
                    ...state,
                    all: [],
                    cash: [],
                    fno: [],
                    currency: [],
                    commodity: [],
                    news: [],
                    index: 3,
                    loading: { key: action.mode, state: true },
                    selectedTab: action.mode,
                    searchText: action.scrip,
                    recentSearchVisible: false

                }
            }
        }
        case types.SET_SELECTED_TAB: {

            if (state.searchText.length <= 2 && state.searchText.length > 0) {
                return {
                    ...state,
                    selectedTab: action.payload,
                    all: lables.minchar,
                    cash: lables.minchar,
                    currency: lables.minchar,
                    commodity: lables.minchar,
                    fno: lables.minchar,
                    recentSearchVisible: false

                }
            }
            else {
                return {
                    ...state,
                    selectedTab: action.payload,
                    all: [],
                    cash: [],
                    currency: [],
                    commodity: [],
                    fno: [],
                    recentSearchVisible: false

                }
            }
        }

        case types.RECENT_SEARCH: {
            // if (!state.recentSearchVisible){
            DeviceEventEmitter.emit(constants.RECENTSEARCH);
            // }
            return {
                ...state,
                recentSearchVisible: true
            }
        }

        case types.SET_SEARCH_TEXT:
            // if (state.recentSearchVisible){
            DeviceEventEmitter.emit(constants.SEARCH);
            // }
            return {
                ...state,
                searchText: action.payload,
                all: action.payload.length <= 1 ? lables.minchar : [],
                cash: action.payload.length <= 1 ? lables.minchar : [],
                currency: action.payload.length <= 1 ? lables.minchar : [],
                commodity: action.payload.length <= 1 ? lables.minchar : [],
                fno: action.payload.length <= 1 ? lables.minchar : [],
                loading: { key: action.key, state: false },
                recentSearchVisible: false
            }
        case types.SEARCH_SUCCESS: {
            let loading = state.loading;
            loading.state = false
            if (action.mode == 0) {
                return {
                    ...state,
                    all: action.data.result,
                    loading,
                    recentSearchVisible: false

                }
            }
            else if (action.mode == 1) {
                return {
                    ...state,
                    cash: action.data.result,
                    loading,
                    recentSearchVisible: false

                }
            }
            else if (action.mode == 2) {
                return {
                    ...state,
                    fno: action.data.result,
                    loading,
                    recentSearchVisible: false

                }
            }
            else if (action.mode == 3) {
                return {
                    ...state,
                    currency: action.data.result,
                    loading,
                    recentSearchVisible: false

                }
            }
            else {
                return {
                    ...state,
                    commodity: action.data.result,
                    loading,
                    recentSearchVisible: false

                }
            }
        }
        case types.SEARCH_FAILURE: {

            /**
             * Capturing Log Events for Search failure scenario
             */
            LogEvents(eventName.noSearchResult, {search_input: state.searchText})

            let loading = state.loading;
            loading.key = action.mode;
            loading.state = false
            if (action.mode == 0) {
                return {
                    ...state,
                    all: action.data,
                    loading,
                    recentSearchVisible: false

                }
            }
            else if (action.mode == 1) {
                return {
                    ...state,
                    cash: action.data,
                    loading,
                    recentSearchVisible: false

                }
            }
            else if (action.mode == 2) {
                return {
                    ...state,
                    fno: action.data,
                    loading,
                    recentSearchVisible: false

                }
            }
            else if (action.mode == 3) {
                return {
                    ...state,
                    currency: action.data,
                    loading,
                    recentSearchVisible: false

                }
            }
            else {
                return {
                    ...state,
                    commodity: action.data,
                    loading,
                    recentSearchVisible: false

                }
            }
        }
        case types.CLEAR_RESULT: {
            return {
                ...state,
                all: [],
                cash: [],
                currency: [],
                commodity: [],
                fno: [],
                news: [],
                index: 3,
                recentSearchVisible: true

            }
        }
        case types.CLEAR_SEARCH_STATE:
            return {

                all: [],
                cash: [],
                currency: [],
                commodity: [],
                fno: [],
                selectedTab: 0,
                searchText: '',
                loading: { key: 0, state: false },
                news: [],
                index: 3,
                recentSearchVisible: true


            }
        case types.NEWS_SUCCESS:
            return {
                ...state,
                news: action.data,
                index: action.index
            }
        case types.SET_ENABLE_LOG:
            return {
                ...state,
                enableLog: action.payload
            }
        default:
            return state
    }

}
export default searchReducer;