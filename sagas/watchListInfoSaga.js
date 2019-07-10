import { takeEvery, call, put } from 'redux-saga/effects';
import { WATCH } from './../types';
import { fetchWatchListInfo } from "../api";
import { watchListSuccess, watchListError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/watchlist/3883/store/5
        const watchlist = yield call(fetchWatchListInfo, action.user);
        yield put(watchListSuccess(watchlist));
    } catch (error) {
        // dispatch error
        yield put(watchListError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(WATCH.WATCH_LIST_INFO_LOADING, handleConsoleData);
}