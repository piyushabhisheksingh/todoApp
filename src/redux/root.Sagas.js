import { all } from 'redux-saga/effects';
import { watchSearch, watchAddStock, watchDeleteStock, watchRecentStocks } from './search/search.Sagas';
import { watchRenameWatchlist, watchDeleteWatchlist, watchGetLtpData, watchCreateWatchList, watchListWatchlist, watchViewWatchlist, watchDeleteStockByID, watchDeleteStockByName, watchReArrangeStock, watchViewWatchByNamelist, watchViewRecentWatchlist, watchRearrangeWatchlist } from './watchlist/watchlist.Sagas';
import { watchDeviceInfo, watchLogin, watchSettings, watchSendAccessCode, watchAuthenticateViaAc, watchRegisterBiometrics, watchAuthenticateViaBm, watchSessionInit, watchLogout, watchSetStwt, watchGetStwt } from './login/login.Sagas';
import { watchRecentSearch } from './recentSearch/recentSearch.Saga';
import { watchManageDevice, watchDeleteBiometricDevice } from '../redux/Setting/settingSaga'
import {
    watchNormalOrder, watchModifyNormalOrder, watchDeleteNormalOrder, watchSuperMultipleOrder, watchModifySuperMultipleOrder, watchDeleteSuperMultipleOrder
    , watchSquareOffSuperMultipleOrder, watchMarginTradingOrder, watchDeleteMarginTradingOrder, watchModifyMarginTradingOrder, watchMarginCalc, watchSorOrder,
    watchgetOrderBook, watchgetTradeBook
} from './orders/orders.Sagas'
import { watchMarketDepth, watchGetCocode } from '../redux/marketDepth/marketDepth.Sagas';

/**
 * rootSaga, A root Saga aggregates multiple Sagas to a single entry point for the sagaMiddleware to run
 * Here, the all effect is used with an array and your sagas will be executed in parallel
 */
function* rootSaga() {
    yield all([
        watchSearch(),
        watchAddStock(),
        watchDeleteStock(),
        watchGetLtpData(),
        watchDeviceInfo(),
        watchLogin(),
        watchRecentSearch(),
        watchDeleteStockByID(),
        watchDeleteStockByName(),
        watchSettings(),
        watchCreateWatchList(),
        watchListWatchlist(),
        watchViewWatchlist(),
        watchReArrangeStock(),
        watchViewWatchByNamelist(),
        watchRecentStocks(),
        watchViewRecentWatchlist(),
        watchRenameWatchlist(),
        watchDeleteWatchlist(),
        watchRearrangeWatchlist(),
        watchManageDevice(),
        watchDeleteBiometricDevice(),
        watchSendAccessCode(),
        watchAuthenticateViaAc(),
        watchRegisterBiometrics(),
        watchAuthenticateViaBm(),
        watchSessionInit(),
        watchLogout(),
        watchSetStwt(),
        watchGetStwt(),
        watchNormalOrder(),
        watchModifyNormalOrder(),
        watchDeleteNormalOrder(),
        watchSuperMultipleOrder(),
        watchModifySuperMultipleOrder(),
        watchDeleteSuperMultipleOrder(),
        watchSquareOffSuperMultipleOrder(),
        watchMarginTradingOrder(),
        watchDeleteMarginTradingOrder(),
        watchModifyMarginTradingOrder(),
        watchMarginCalc(),
        watchSorOrder(),
        watchMarketDepth(),
        watchGetCocode(),
        watchgetOrderBook(),
        watchgetTradeBook()
    ])
}
export default rootSaga;
