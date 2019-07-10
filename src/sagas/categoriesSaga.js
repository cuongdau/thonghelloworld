import { takeEvery, call, put } from 'redux-saga/effects';
import { HOME } from './../types';
import { fetchCategories } from "../api";
import { setCategoriesSuccess, setCategoriesError } from "../actions";

function* handleConsoleData() {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/catalog/category/tree
        const categories = yield call(fetchCategories);
        yield put(setCategoriesSuccess(categories));
    } catch (error) {
        // dispatch error
        yield put(setCategoriesError());
    }
}

export default function* watchDateLoader() {
    yield takeEvery(HOME.CATEGORIES_LOADING, handleConsoleData);
}