import { takeEvery, call, put } from 'redux-saga/effects';
import { WATCH } from './../types';
import { fetchAddWatchList } from "../api";
import { watchListSuccess, watchListError } from "../actions";
import {Alert} from "react-native";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/watchlist/3883/store/5
        const watchlist = yield call(fetchAddWatchList, action);
        yield put(watchListSuccess(watchlist));

        Alert.alert(
            'Watchlist',
            'This item has been added to your watchlist.',
            [
                {text: 'OK'},
            ],
            {cancelable: false}
        );
    } catch (error) {
        // dispatch error
        yield put(watchListError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(WATCH.ADD_TO_WATCH_LIST, handleConsoleData);
}