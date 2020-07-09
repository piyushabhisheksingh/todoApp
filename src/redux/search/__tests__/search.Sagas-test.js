import store from '../../store'
import * as types from '../search.Types'
import reducer from '../search.Reducers'
import { waitForElement } from 'react-native-testing-library';
import * as watchlistType from '../../watchlist/watchlist.Types'
import * as apis from '../search.Apis'
import { services } from '../../config/api'

export const onSuccess = () => { }
export const onError = () => { }

const obj = {
    onSuccess: () => { },
    onError: () => { },
}

const item ={
    alt_wtoken: "95577",
    company: "SBI Life Insurance Company Ltd",
    display_fno_eq: "",
    display_segment: "EQ",
    exchange: "NSE",
    expiry: "",
    ltp: "-1",
    market_lot: "1",
    me: "NN",
    netchange: "-1",
    options: "- ",
    percentage: "-1",
    series: "EQ",
    strikeprice: ".0000",
    symbol: "SBILIFE",
    tick_size: "500",
    wtoken: "95551",
}
describe('Search Saga', () => {
    it('1. verify search saga', async () => {
        store.dispatch({ type: types.SEARCH, params: ',ACC', scrip: 'ACC', mode: 0, prevIndex: 1, event: 'search', delay: 500 })
        await waitForElement(() => expect(store.getState().search.all.length).toBeTruthy())
        //await waitForElement(() => expect(store.getState().search.news.length).toBeTruthy())
    });
    it('2. verify search saga', async () => {

        store.dispatch({ type: types.SEARCH, params: ',KALYANIFRG', scrip: 'KALYANIFRG', mode: 0, prevIndex: 1 })
        await waitForElement(() => expect(store.getState().search.all.length).toBeTruthy())
        //await waitForElement(() => expect(store.getState().search.news.length).toBeTruthy())
    });
    it('3. verify search saga', async () => {

        store.dispatch({ type: types.SEARCH, params: ',Taskjskjasjhjdhh', scrip: 'Taskjskjasjhjdhh', mode: 0, prevIndex: 1 })
        await waitForElement(() => expect(store.getState().search.all.length).toBeTruthy())
    });
    it('4. verify search saga', async () => {

        store.dispatch({ type: types.SEARCH, scrip: '', mode: 2, prevIndex: 1, params: 2122 })
        await waitForElement(() => expect(store.getState().search.fno.length).toBeFalsy())
    });

    it('5. verify addStock action saga', async () => {
        services.apitype = 'addStockByWname';
        let payload = { watchlistName: 'recent', wtoken: 727, item: item }
        let data = { type: types.ADD_STOCK, payload, onSuccess: obj.onSuccess, onError: obj.onError }
        store.dispatch(data)
        const spy1 = jest.spyOn(apis, "addStockByWname");
        expect(spy1).toHaveBeenCalled
    })

    it('6. verify  addStock ', async () => {
        services.apitype = 'addstock';
        store.dispatch({
            type: watchlistType.CREATE_WATCHLIST_SUCCESS, mode: 0, index: 0,
            payload: {
                watchlistId: 3000684,
                watchlistName: "WatchlistFav"
            }
        })
        let payload = { watchlistId: 3000684, watchlistName: 'WatchlistFav', wtoken: 727, item: item }
        let data = { type: types.ADD_STOCK, payload, onSuccess: obj.onSuccess, onError: obj.onError }
        store.dispatch(data)
        const spy1 = jest.spyOn(apis, "addStock");
        expect(spy1).toHaveBeenCalled
    })

    it('7. verify deleteStock saga', async () => {
        services.apitype = 'deleteStock';
        store.dispatch({
            type: watchlistType.CREATE_WATCHLIST_SUCCESS, mode: 0, index: 3,
            payload: {
                watchlistId: 3000684,
                watchlistName: "WatchlistFav"
            }
        })
        let payload = { watchlistId: 3000684, watchlistName: 'WatchlistFav', wtoken: 727 }
        let data = { type: types.DELETE_STOCK, payload, onSuccess: obj.onSuccess, onError: obj.onError }
        store.dispatch(data)
        const spy1 = jest.spyOn(data, "onSuccess");
        await waitForElement(() => {
            expect(spy1).toBeCalled();
        })

    })

    it('8. verify deleteStock failure saga', async () => {
        services.apitype = 'deleteStock';
        store.dispatch({
            type: watchlistType.CREATE_WATCHLIST_SUCCESS, mode: 0, index: 3,
            payload: {
                watchlistId: 3000684,
                watchlistName: "WatchlistFav"
            }
        })
        let payload = { watchlistId: 3000684, watchlistName: 'WatchlistFav', wtoken: 727 }
        let data = { type: types.DELETE_STOCK, payload, onSuccess: obj.onSuccess, onError: obj.onError }
        store.dispatch(data)
        const spy1 = jest.spyOn(data, "onError");
        await waitForElement(() => {
            expect(spy1).toBeCalled();
        })

    })

    it('9. verify AddToRecent  saga', async () => {
        services.apitype = 'addstock';
        let payload = { watchlistName: 'recent', wtoken: 727, item: item }
        let data = { type: types.ADD_RECENTSTOCK, payload }
        store.dispatch(data)

        const spy1 = jest.spyOn(apis, "addRecentStock");
        await waitForElement(() => {
            expect(spy1).toHaveBeenCalled
        })
        await waitForElement(() => expect(store.getState().recentSearch.selectedCount).toBe(0))

       
    })
});