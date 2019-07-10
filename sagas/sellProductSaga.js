import { takeEvery } from 'redux-saga/effects';
import { SELL } from './../types';

function* handleConsoleData(action) {
    console.log(action.values);
}

export default function* watchDateLoader() {
    yield takeEvery(SELL.PRODUCT_LOADING, handleConsoleData);
}