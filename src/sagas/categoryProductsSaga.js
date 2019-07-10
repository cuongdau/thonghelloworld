import { takeEvery, call, put } from 'redux-saga/effects';
import { HOME } from './../types';
import { fetchCategoryProducts } from "../api";
import { setCategoryProductsSuccess, setCategoryProductsError } from "../actions";

function* handleConsoleData(item) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/products/store/5/category/77?page=2
        const products = yield call(fetchCategoryProducts, item);
        yield put(setCategoryProductsSuccess(products));
    } catch (error) {
        // dispatch error
        yield put(setCategoryProductsError(error));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(HOME.CATEGORY_PRODUCTS_LOADING, handleConsoleData);
}