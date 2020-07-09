import { put, call, fork, takeLatest, delay, takeEvery } from 'redux-saga/effects';
import * as types from './search.Types';
import * as typesOne from '../watchlist/watchlist.Types';
import * as searchApis from './search.Apis';
import { setInfo, getInfo, getAppInfo } from '../../utils/localStorage'
import key from '../../utils/storagekey';
import store from '../store';
import * as watchlistApis from '../watchlist/watchlist.Apis';
import { convertToInt } from '../../utils/commonFunctions';
import { RECENT_SEARCH_RESULT } from '../recentSearch/recentSearch.Types';
import appConstants from '../../utils/appConstants';
import { perfEvents } from '../../../__analytics__/event'

/**
 * search, this function takes one argument. This function calls the search and api and then it returns the response
 */
export function* Search(action) {
    /**
    * @param {Object} action - actions contains request parameters
    */
    try {
        while (perfEvents.enableLog && perfEvents.eventDispatcher[1]) {
            perfEvents.eventDispatcher.shift();
        }
 
        yield delay(action.delay)
        if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
            perfEvents.eventDispatcher[0].apiStartTime = Date.now();
            perfEvents.eventDispatcher[0].param =JSON.stringify(action.params);
            perfEvents.eventDispatcher[0].delay=200; 
        }
        const { params, mode } = action;
        if (action.scrip.length) {
            const result = yield call(searchApis.search, params);
            const data = result.response;
            if (data && data.data) {
                if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
                    perfEvents.eventDispatcher[0].apiEndTime = Date.now();
                    perfEvents.eventDispatcher[0].doLog = true
                }
                yield put({ type: types.SEARCH_SUCCESS, data: data.data, mode})
                /*if (mode == 0 || mode == 1) {
                    for (let i = 0; i < data.data.result.length; i++) {
                        const item = data.data.result[i];
                        if (item.symbol == action.scrip) {
                            yield delay(500)
                            const newsData = yield call(searchApis.mock)
                            if (data.data.result && newsData && newsData.data && newsData.data.result && newsData.data.result.length > 0) {
                                let index = data.data.result.length > 3 ? 3 : data.data.result.length - 1
                                yield put({ type: types.NEWS_SUCCESS, data: newsData.data.result, index: index })
                            }
                            break;
                        }
                    }
                }*/

            } else {
                if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
                    perfEvents.eventDispatcher.shift();
                }
                yield put({ type: types.SEARCH_FAILURE, data: data.result ? data.result : data.toString(), mode })
            }
        }
    } catch (error) {
        if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
            perfEvents.eventDispatcher.shift();
        }
        const { mode } = action;
        yield put({ type: types.SEARCH_FAILURE, data: error.toString(), mode })
    }
}

/**
 * watchSearch, this is a watcher function for search action, it takes no arguments, it will call the search function and it always takes the latest call
 */
export function* watchSearch() {
    yield takeLatest(types.SEARCH, Search)
}

export function* AddStock(action) {
    try {
        
        // if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
        //     perfEvents.eventDispatcher[0].apiStartTime = Date.now();
        //     perfEvents.eventDispatcher[0].param = action.payload;
        // }
        if (store.getState().watchlist.watchlistTab[0]) {
            const response = yield call(searchApis.addStock, action.payload);
            // if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
            //     perfEvents.eventDispatcher[0].apiEndTime = Date.now();
            //     perfEvents.eventDispatcher[0].doLog = true
            // }
            if (response && response.data && response.data.Success) {
                let details = response.data.Success;
                let item = action.payload.item;
                let stcokresult = {
                    instrumentToken: Number(item.wtoken),
                    company: item.company,
                    expiryDate: details.expiryDate,
                    strikePrice: details.strikePrice,
                    symbol: details.symbol,
                    exchange: details.exchange,
                    optionType: details.optionType,
                    it: details.it,
                    tokenAddedLtp: details.tokenAddedLtp,
                    tokenAddedTime: details.tokenAddedTime,
                };
                yield put({ type: typesOne.ADDSTOCK_WATCHLIST_SUCCESS, payload: stcokresult, key: action.payload.watchlistId })
                action.onSuccess(stcokresult)
                const watchlistItems = store.getState().watchlist.watchlistItems;
                const watchlistTab = store.getState().watchlist.watchlistTab;
                yield call(setInfo, key.viewWatchlist + action.payload.watchlistId, watchlistItems)
                yield call(setInfo, key.listWatchlist, watchlistTab);
            } else {
                if (response && response.data && response.data.fault) {
                    action.onError(response.data.fault.message.toString())
                } else {
                    action.onError(response.toString())
                }
            }
        } else {
            // if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
            //     perfEvents.eventDispatcher[0].apiStartTime = Date.now();
            //     perfEvents.eventDispatcher[0].param = action.payload;
            // }
            const response = yield call(searchApis.addStockByWname, action.payload)
            // if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
            //     perfEvents.eventDispatcher[0].apiEndTime = Date.now();
            //     perfEvents.eventDispatcher[0].doLog = true
            // }

            if (response && response.data && response.data.Success) {
                let result = {
                    watchlistId: response.data.Success.watchlistId,
                    watchlistName: response.data.Success.watchlistName,
                    instrumentCount: 0
                };


                yield put({ type: typesOne.CREATE_WATCHLIST_SUCCESS, payload: result });
                let details = response.data.Success;
                let item = action.payload.item;
                let stcokresult = {
                    instrumentToken: Number(item.wtoken),
                    company: item.company,
                    expiryDate: details.expiryDate,
                    strikePrice: details.strikePrice,
                    symbol: details.symbol,
                    exchange: details.exchange,
                    optionType: details.optionType,
                    it: details.it,
                    tokenAddedLtp: details.tokenAddedLtp,
                    tokenAddedTime: details.tokenAddedTime,
                };

                yield put({ type: typesOne.ADDSTOCK_WATCHLIST_SUCCESS, payload: stcokresult, key: result.watchlistId })
                action.onSuccess(stcokresult, result)
                const watchlistItems = store.getState().watchlist.watchlistItems;
                const watchlistTab = store.getState().watchlist.watchlistTab;
                yield call(setInfo, key.viewWatchlist + action.payload.watchlistId, watchlistItems)
                yield call(setInfo, key.listWatchlist, watchlistTab);
            } else {
                if (response && response.data && response.data.fault) {
                    action.onError(response.data.fault.message.toString())
                } else {
                    action.onError(response.toString())
                }
            }
        }
    } catch (error) {
        action.onError(error.toString())
    }
}

export function* watchAddStock() {
    yield takeEvery(types.ADD_STOCK, AddStock)
}

export function* DeleteStock(action) {
    try {
        if (store.getState().watchlist.watchlistTab.length > 0) {
            // if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
            //     perfEvents.eventDispatcher[0].apiStartTime = Date.now();
            //     perfEvents.eventDispatcher[0].param = action.payload;
            // }
            const response = yield call(searchApis.deleteStock, action.payload);
            // if (perfEvents.enableLog && perfEvents.eventDispatcher[0]) {
            //     perfEvents.eventDispatcher[0].apiEndTime = Date.now();
            //     perfEvents.eventDispatcher[0].doLog = true
            // }
            if (response && response.data && response.data.Success) {
                yield put({ type: typesOne.DELETESTOCK_WATCHLIST_SUCCESS, payload: action.payload, key: action.payload.watchlistId });
                action.onSuccess(action.payload.wtoken)
                const watchlistItems = store.getState().watchlist.watchlistItems;
                const watchlistTab = store.getState().watchlist.watchlistTab;
                yield call(setInfo, key.viewWatchlist + action.payload.watchlistId, watchlistItems)
                yield call(setInfo, key.listWatchlist, watchlistTab);
            } else {
                if (response && response.data && response.data.fault) {
                    action.onError(response.data.fault.message.toString())
                } else {
                    action.onError(response.toString())
                }

            }
        }
    } catch (error) {
        action.onError(error.toString())
    }
}

export function* watchDeleteStock() {
    yield takeEvery(types.DELETE_STOCK, DeleteStock)
}

export function* AddToRecent(action) {
    try {
        let token = []
        let cache = yield call(getAppInfo, key.recentWatchlist)

        if (cache) {
            token = cache.map((it) => {
                return convertToInt(it.instrumentToken)
            })
        }


        if (!token.includes(convertToInt(action.payload.item.wtoken))) {
            const response = yield call(searchApis.addRecentStock, action.payload);
            if (response && response.data && response.data.Success) {
                action.payload.item.instrumentToken = convertToInt(action.payload.item.wtoken)
                action.payload.item.expiryDate = action.payload.item.expiry
                action.payload.item.strikePrice = action.payload.item.strikeprice
                action.payload.item.optionType = action.payload.item.options
                let list = []
                if (cache) {
                    list = [action.payload.item, ...cache]
                    yield call(setInfo, key.recentWatchlist, list)
                } else {
                    list = [action.payload.item]
                    yield call(setInfo, key.recentWatchlist, list)
                }

                yield put({ type: RECENT_SEARCH_RESULT, payload: list })
            }
        }

    } catch (error) { 
    }
}
export function* watchRecentStocks() {
    yield takeEvery(types.ADD_RECENTSTOCK, AddToRecent)
}

