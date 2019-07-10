import { takeEvery, call, put } from 'redux-saga/effects';
import { HOME } from './../types';
import { fetchCategoriesByBrand } from "../api";
import { setCategoriesByBrandSuccess, setCategoriesByBrandError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/brand/266/store/5
        const categories = yield call(fetchCategoriesByBrand, action.id);
        yield put(setCategoriesByBrandSuccess(categories));
        yield action.navigation.navigate('Category');
    } catch (error) {
        // dispatch error
        yield put(setCategoriesByBrandError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(HOME.CATEGORIES_BY_BRAND_LOADING, handleConsoleData);
}