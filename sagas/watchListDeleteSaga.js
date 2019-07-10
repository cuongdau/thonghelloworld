import { takeEvery, call, put } from 'redux-saga/effects';
import { WATCH } from './../types';
import { fetchDeleteWatchList, fetchWatchListInfo } from "../api";
import { watchListSuccess, watchListError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/watchlist/3883/product/:productId
        yield call(fetchDeleteWatchList, action);
        const watchlist = yield call(fetchWatchListInfo, action.user);
        yield put(watchListSuccess(watchlist));
    } catch (error) {
        // dispatch error
        yield put(watchListError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(WATCH.DELETE_FROM_WATCH_LIST, handleConsoleData);
}