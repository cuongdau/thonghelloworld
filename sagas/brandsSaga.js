import { takeEvery, call, put } from 'redux-saga/effects';
import { HOME } from './../types';
import { fetchBrands } from "../api";
import { setBrandsSuccess, setBrandsError } from "../actions";

function* handleConsoleData() {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/brands/store/5
        const brands = yield call(fetchBrands);
        yield put(setBrandsSuccess(brands));
    } catch (error) {
        // dispatch error
        yield put(setBrandsError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(HOME.BRANDS_LOADING, handleConsoleData);
}