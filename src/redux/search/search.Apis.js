import { api } from '../config/api';
import { apiRoutes, BASE_API_URL } from '../config/routes';
import { base64 } from '../../utils/commonFunctions';
import { setLoading, removeLoading } from '../../components/common/LoadingIndicator'
import { services } from '../config/api'
/**
 * search, this will take one argument and it converts params to base64 and then it will call the search api
 */
export const search = (params) => {
    setLoading();
    /**
    * @param {string} params - params contains display segment and search query
    */
    let encoded = base64(params);
    return api(BASE_API_URL).get(apiRoutes.search + encoded)
        .then((response) => {
            removeLoading();
            if (response && response.data) {
                return { response };
            } else {
                return { response: null };
            }
        })
        .catch((error) => {
            removeLoading();
            return { response: error };
        });
};

export const addStock = (params) => {
    setLoading();
    services.apitype = 'addstock';
    return api(BASE_API_URL).post(apiRoutes.addStock(params.watchlistId, params.wtoken))
        .then((response) => {
            removeLoading();
            return response
        })
        .catch((error) => {
            removeLoading();
            return error
        })
}

export const addStockByWname = (params) => {
    setLoading();
    services.apitype = 'addStockByWname';
    return api(BASE_API_URL).post(apiRoutes.addStockByWname(params.watchlistName, params.wtoken))
        .then((response) => {
            removeLoading();
            return response
        })
        .catch((error) => {
            removeLoading();
            return error
        })
}

export const addRecentStock = (params) => {
    services.apitype = 'addstock';
    setLoading();
    return api(BASE_API_URL).post(apiRoutes.recentAddStock(params.watchlistName, params.wtoken))
        .then((response) => {
            removeLoading();
            return response
        })
        .catch((error) => {
            removeLoading();
            return error
        })
}

export const deleteStock = (params) => {
    services.apitype = 'deleteStock';
    setLoading();
    return api(BASE_API_URL).delete(apiRoutes.deleteStock(params.watchlistId, params.wtoken))
        .then((response) => {
            removeLoading();
            return response
        })
        .catch((error) => {
            removeLoading();
            return error
        })
}

/**
 * mock, this will take no arguments and it will call the news api
 */
/*export const mock = () => {
    const url = apiRoutes.mocks[getRandom()].news;
    return mockApi.get(url)
        .then((response) => {
            if (response && response.data) {
                return response;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error;
        });
}*/