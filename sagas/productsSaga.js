import { takeEvery, call, put } from 'redux-saga/effects';
import { HOME } from './../types';
import { fetchProducts } from "../api";
import { setProductsSuccess, setProductsError } from "../actions";

function* handleConsoleData() {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/products/store/5
        const products = yield call(fetchProducts);
        yield put(setProductsSuccess(products));
    } catch (error) {
        // dispatch error
        yield put(setProductsError());
    }
}

export default function* watchDateLoader() {
    yield takeEvery(HOME.PRODUCTS_LOADING, handleConsoleData);
}