import search from '../search.Reducers'
import * as types from '../search.Types'

const state = {
    all: [],
    cash: [],
    currency: [],
    commodity: [],
    fno: [],
    selectedTab: 0,
    searchText: '',
    loading: false,
    news: [],
    index: 3,
    recentSearchVisible: true,
    event: {},
    enableLog: false
}

const state2 = {
    all: [],
    cash: [],
    currency: [],
    commodity: [],
    fno: [],
    selectedTab: 0,
    searchText: 'a',
    loading: false,
    news: [],
    index: 3,
    recentSearchVisible: true,
    event: {},
    enableLog: false
}
const state3 = {
    all: [],
    cash: [],
    currency: [],
    commodity: [],
    fno: [],
    selectedTab: 0,
    searchText: 'abs',
    loading: false,
    news: [],
    index: 3,
    recentSearchVisible: true,
    event: {},
    enableLog: false
}
const action1 = { type: types.SEARCH, prevIndex: 0, mode: 0, scrip: 'as' }
const action2 = { type: types.SEARCH, prevIndex: 1, mode: 0, scrip: 'as' }
const action3 = { type: types.SEARCH, prevIndex: 2, mode: 0, scrip: 'as' }
const action4 = { type: types.SEARCH, prevIndex: 3, mode: 0, scrip: 'as' }
const action5 = { type: types.SEARCH, prevIndex: 4, mode: 0, scrip: 'as' }
const action6 = { type: types.SET_SELECTED_TAB, payload: 2 }
const action7 = { type: types.SET_SEARCH_TEXT, payload: 'aghs' }
const action8 = { type: types.SEARCH_SUCCESS, data: { result: [] }, mode: 0 }
const action9 = { type: types.SEARCH_SUCCESS, data: { result: [[1, 2]] }, mode: 1 }
const action10 = { type: types.SEARCH_SUCCESS, data: { result: [] }, mode: 2 }
const action11 = { type: types.SEARCH_SUCCESS, data: { result: [] }, mode: 3 }
const action12 = { type: types.SEARCH_SUCCESS, data: { result: [] }, mode: 4 }
const action13 = { type: types.SEARCH_FAILURE, data: { result: [] }, mode: 0 }
const action14 = { type: types.SEARCH_FAILURE, data: { result: [[1, 2]] }, mode: 1 }
const action15 = { type: types.SEARCH_FAILURE, data: { result: [] }, mode: 2 }
const action16 = { type: types.SEARCH_FAILURE, data: { result: [] }, mode: 3 }
const action17 = { type: types.SEARCH_FAILURE, data: { result: [] }, mode: 4 }
const action18 = { type: types.CLEAR_SEARCH_STATE }
const action19 = { type: types.NEWS_SUCCESS, data: [], index: 1 }
const action20 = { type: "ABSB" }
const action21 = { type: types.CLEAR_RESULT }
const action22 = { type: types.SET_SEARCH_TEXT, payload: '' }
const action23 = { type: types.SEARCH, prevIndex: 0, mode: 1, scrip: 'as' }
const action24 = { type: types.SET_ENABLE_LOG, payload: []}
const action25 = { type: types.RECENT_SEARCH }


describe('Search Actions', () => {
    it('1. verify SEARCH', () => {
        const result = search(state, action1)
        expect(result).toMatchSnapshot();
    });
    it('2. verify SEARCH', () => {
        const result = search(state, action2)
        expect(result).toMatchSnapshot();
    });
    it('3. verify SEARCH', () => {
        const result = search(state, action3)
        expect(result).toMatchSnapshot();
    });
    it('4. verify SEARCH', () => {
        const result = search(state, action4)
        expect(result).toMatchSnapshot();
    });
    it('5. verify SEARCH', () => {
        const result = search(state, action5)
        expect(result).toMatchSnapshot();
    });
    it('6. verify SET_SELECTED_TAB', () => {
        const result = search(state, action6)
        expect(result).toMatchSnapshot();
    });
    it('7. verify SET_SELECTED_TAB', () => {
        const result = search(state2, action6)
        expect(result).toMatchSnapshot();
    });
    it('8. verify SET_SELECTED_TAB', () => {
        const result = search(state3, action6)
        expect(result).toMatchSnapshot();
    });
    it('9. verify SET_SEARCH_TEXT', () => {
        const result = search(state3, action7)
        expect(result).toMatchSnapshot();
    });
    it('10. verify SEARCH_SUCCESS when mode is 0', () => {
        const result = search(state3, action8)
        expect(result).toMatchSnapshot();
    });
    it('11. verify SEARCH_SUCCESS when mode is 1', () => {
        const result = search(state3, action9)
        expect(result).toMatchSnapshot();
    });
    it('12. verify SEARCH_SUCCESS when mode is 2', () => {
        const result = search(state3, action10)
        expect(result).toMatchSnapshot();
    });
    it('13. verify SEARCH_SUCCESS when mode is 3', () => {
        const result = search(state3, action11)
        expect(result).toMatchSnapshot();
    });
    it('14. verify SEARCH_SUCCESS when mode is 4', () => {
        const result = search(state3, action12)
        expect(result).toMatchSnapshot();
    });
    it('15. verify SEARCH_FAILURE when mode is 0', () => {
        const result = search(state3, action13)
        expect(result).toMatchSnapshot();
    });
    it('16. verify SEARCH_FAILURE when mode is 1', () => {
        const result = search(state3, action14)
        expect(result).toMatchSnapshot();
    });
    it('17. verify SEARCH_FAILURE when mode is 2', () => {
        const result = search(state3, action15)
        expect(result).toMatchSnapshot();
    });
    it('18. verify SEARCH_FAILURE when mode is 3', () => {
        const result = search(state3, action16)
        expect(result).toMatchSnapshot();
    });
    it('19. verify SEARCH_FAILURE when mode is 4', () => {
        const result = search(state3, action17)
        expect(result).toMatchSnapshot();
    });
    it('20. verify CLEAR_SEARCH_STATE', () => {
        const result = search(state3, action18)
        expect(result).toMatchSnapshot();
    });
    it('21. verify NEWS_SUCCESS', () => {
        const result = search(state3, action19)
        expect(result).toMatchSnapshot();
    });
    it('22. verify default case', () => {
        const result = search(state3, action20)
        expect(result).toMatchSnapshot();
    });
    it('23. verify CLEAR_RESULT', () => {
        const result = search(state3, action21)
        expect(result).toMatchSnapshot();
    });
    it('24. verify SET_SEARCH_TEXT', () => {
        const result = search(state3, action22)
        expect(result).toMatchSnapshot();
    });
    it('25. verify search', () => {
        const result = search(state, action23)
        expect(result).toMatchSnapshot();
    });
    it('26. verify search', () => {
        const result = search(state, action24)
        expect(result).toMatchSnapshot();
    });
     it('26. verify search', () => {
        const result = search(state, action25)
        expect(result).toMatchSnapshot();
    });
});