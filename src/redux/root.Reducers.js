import { combineReducers } from 'redux';
import searchReducers from './search/search.Reducers';
import themeReducers from './theme/theme.Reducers';
import recentSearchReducers from '../redux/recentSearch/recentSearch.Reducers';
import watchlistReducers from './watchlist/watchlist.Reducers';
import loginReducers from './login/login.Reducers';
import settingReducer from '../redux/Setting/settingReducer'
import ordersReducer from '../redux/orders/orders.Reducers'

import marketDepthReducer from '../redux/marketDepth/marketDepth.Reducers';
/**
 * This will combine allreducers to generate single store object
 */
const appReducer = combineReducers({
    search: searchReducers,
    theme: themeReducers,
    recentSearch: recentSearchReducers,
    watchlist: watchlistReducers,
    login: loginReducers,
    setting: settingReducer,
    orders: ordersReducer,
    marketDepth: marketDepthReducer

})

const allReducers = (state, action) => {
    /*if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined;
    }*/

    return appReducer(state, action)
}

export default allReducers;