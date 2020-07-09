
import * as search from '../search.Actions'

const onSuccess = jest.fn()
const onError = jest.fn()

describe('Search Actions', () => {
    it('1. verify search action', () => {
        const result = search.search(1, "ab", 0)
        expect(result).toMatchSnapshot();
    });
    it('2. verify clearSearchState action', () => {
        const result = search.clearSearchState()
        expect(result).toMatchSnapshot();
    });
    it('3. verify clearState action', () => {
        const result = search.clearState()
        expect(result).toMatchSnapshot();
    });
    it('4. verify setSearchText action', () => {
        const result = search.setSearchText("ab")
        expect(result).toMatchSnapshot();
    });
    it('5. verify setTab action', () => {
        const result = search.setTab(1)
        expect(result).toMatchSnapshot();
    });
    it('6. verify search action', () => {
        const result = search.search(0, "ab", 1)
        expect(result).toMatchSnapshot();
    });
    it('7. verify search action', () => {
        const result = search.search(2, "ab", 3)
        expect(result).toMatchSnapshot();
    });
    it('8. verify search action', () => {
        const result = search.search(3, "ab", 4)
        expect(result).toMatchSnapshot();
    });
    it('9. verify search action', () => {
        const result = search.search(4, "ab", 2)
        expect(result).toMatchSnapshot();
    });

    it('10. verify addStock action', () => {
        let payload = {watchlistId : 3000403, watchlistName: 'WatchlistOne', wtoken: 727}
        const result = search.addStock(payload, onSuccess, onError)
        expect(result).toMatchSnapshot();
    })
    it('11. verify addStockToRecent action', () => {
        let payload = {watchlistId : 3000403, watchlistName: 'recent', wtoken: 727}
        const result = search.addStockToRecent(payload)
        expect(result).toMatchSnapshot();
    })
    it('12. verify deleteStock action', () => {
        let payload = {watchlistId : 3000403, watchlistName: 'WatchlistOne', wtoken: 727}
        const result = search.deleteStock(payload, onSuccess, onError)
        expect(result).toMatchSnapshot();
    })
});